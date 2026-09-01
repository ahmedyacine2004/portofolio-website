import { AIAssistantController } from './ai-assistant.controller';
import { AIAssistantService } from './ai-assistant.service';

describe('AIAssistantService', () => {
  let service: AIAssistantService;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env.AI_PROVIDER = 'gemini';
    process.env.GEMINI_API_KEY = 'test-key';
    service = new AIAssistantService();
  });

  it('should answer profile and skills questions using portfolio context', async () => {
    const answer = await service.generateAnswer('What are your main skills?');

    expect(answer).toContain('React');
    expect(answer).toContain('Next.js');
    expect(answer).toContain('NestJS');
    expect(answer.toLowerCase()).toMatch(
      /(portfolio|stack|design|architecture)/,
    );
  });

  it('should answer experience and project questions', async () => {
    const answer = await service.generateAnswer('Tell me about your projects');

    expect(answer.toLowerCase()).toContain('consultify');
    expect(answer.toLowerCase()).toContain('project');
  });

  it('should route casual general greetings to Gemini and not the portfolio assistant', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: 'I am an AI agent.' }],
            },
          },
        ],
      }),
    });

    global.fetch = fetchMock as typeof fetch;

    const answer = await service.generateAnswer('hellow, are u good?');

    expect(answer).toContain('AI agent');
    expect(answer.toLowerCase()).not.toContain('portfolio assistant');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should route off-topic questions to Gemini and let Gemini answer as an AI agent', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: 'I am an AI agent.' }],
            },
          },
        ],
      }),
    });

    global.fetch = fetchMock as typeof fetch;

    const answer = await service.generateAnswer(
      'What is the capital of France?',
    );

    expect(answer).toContain('AI agent');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should include text file content when a resume or document is attached', async () => {
    const generateAnswer = jest.fn().mockResolvedValue('Resume review ready.');
    const controller = new AIAssistantController({ generateAnswer } as any);

    const response = await controller.ask({
      message: 'Review my resume and tell me what stands out most.',
      attachments: [
        {
          type: 'text',
          name: 'courses.txt',
          data: Buffer.from(
            'React, TypeScript, Node.js, portfolios, leadership',
          ).toString('base64'),
        },
      ],
    });

    expect(response.success).toBe(true);
    expect(generateAnswer).toHaveBeenCalledWith(
      'Review my resume and tell me what stands out most.',
      expect.stringContaining('courses.txt'),
    );
    expect(generateAnswer).toHaveBeenCalledWith(
      'Review my resume and tell me what stands out most.',
      expect.stringContaining('React'),
    );
  });
});
