import { Injectable } from '@nestjs/common';

@Injectable()
export class AIAssistantService {
  private readonly portfolioContext = {
    name: 'Ahmed Yassine Abbane',
    alias: 'Ahmed Yassine',
    title: 'Full Stack Developer and Designer',
    location: 'Tebessa, Algeria',
    currentFocus: 'CONSULTIFY and AI-powered portfolio experiences',
    linkedin: 'https://www.linkedin.com/in/abbane-ahmed-yassine/',
    summary:
      'Ahmed Yassine Abbane is a full-stack developer, designer, and startup-minded builder focused on modern web products, business platforms, and AI-enhanced user experiences.',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'NestJS',
      'MongoDB',
      'PostgreSQL',
      'Node.js',
      'JavaScript',
      'Tailwind CSS',
      'Figma',
      'UI/UX design',
      'API design',
      'System architecture',
      'Product strategy',
    ],
    experience: [
      'Founder and lead developer of CONSULTIFY',
      'Software engineering intern at SOMIPHOS',
      'Full-stack developer and designer for personal products',
      'Frontend and UX roles for startups and university initiatives',
    ],
    projects: [
      'CONSULTIFY — AI-powered consultation ecosystem',
      'Portfolio workspace and personal platform',
      'Full-stack product prototypes and SaaS-style experiences',
    ],
    education: [
      'ESTIN student and engineering-focused learner',
      'Covers modern software engineering, distributed systems, and product development',
    ],
    contact: {
      email: 'ahmedyassine.dev@gmail.com',
      linkedin: 'https://www.linkedin.com/in/abbane-ahmed-yassine/',
      github: 'https://github.com/ahmedyacine2004',
    },
  };

  private readonly portfolioFacts = `
  Name: Ahmed Yassine Abbane
  Role: Full Stack Developer and Designer
  Location: Tebessa, Algeria
  Current focus: CONSULTIFY and AI-powered portfolio experiences
  LinkedIn: https://www.linkedin.com/in/abbane-ahmed-yassine/
  Summary: Ahmed Yassine Abbane is a full-stack developer, designer, and startup-minded builder focused on modern web products, business platforms, and AI-enhanced user experiences.
  Skills: React, Next.js, TypeScript, NestJS, MongoDB, PostgreSQL, Node.js, JavaScript, Tailwind CSS, Figma, UI/UX design, API design, system architecture, product strategy.
  Experience: Founder and lead developer of CONSULTIFY; software engineering intern at SOMIPHOS; full-stack developer and designer for personal products; frontend and UX roles for startups and university initiatives.
  Projects: CONSULTIFY — AI-powered consultation ecosystem; portfolio workspace and personal platform; full-stack product prototypes and SaaS-style experiences.
  Education: ESTIN student and engineering-focused learner; modern software engineering, distributed systems, and product development.
  Contact: LinkedIn profile and portfolio channels, open to full-time, freelance, and collaboration opportunities.
  `;

  private normalizeMessage(message: string): string {
    return message
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private withTyposHandled(message: string): string {
    return this.normalizeMessage(message)
      .replace(/\b(are|r)\s+u\b/g, 'are you')
      .replace(/\bhellow\b/g, 'hello')
      .replace(/\bhelo\b/g, 'hello')
      .replace(/\bim\b/g, 'i am')
      .replace(/\bteh\b/g, 'the')
      .replace(/\bwhats\b/g, 'what is')
      .replace(/\bwht\b/g, 'what')
      .replace(/\bpls\b/g, 'please')
      .replace(/\bgud\b/g, 'good')
      .replace(/\bgool\b/g, 'good')
      .replace(/\bthx\b/g, 'thanks')
      .replace(/\bdo u\b/g, 'do you')
      .replace(/\bcan u\b/g, 'can you')
      .replace(/\bwat\b/g, 'what');
  }

  private isPortfolioQuestion(message: string): boolean {
    const q = this.withTyposHandled(message).toLowerCase();

    const portfolioKeywords = [
      'ahmed',
      'abbane',
      'portfolio',
      'project',
      'work',
      'skills',
      'stack',
      'tech',
      'experience',
      'linkedin',
      'contact',
      'hire',
      'consultify',
      'full stack',
      'designer',
      'developer',
      'about',
      'who are you',
      'who is ahmed',
      'what do you do',
      'what are your skills',
      'tell me about your projects',
      'your projects',
      'your portfolio',
      'your experience',
    ];

    return portfolioKeywords.some((keyword) => q.includes(keyword));
  }

  private async tryExternalLLM(
    message: string,
    attachmentSummary: string,
  ): Promise<string | null> {
    const provider = (process.env.AI_PROVIDER ?? 'groq').toLowerCase();
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (provider === 'groq' && !groqKey) {
      return null;
    }

    if (provider === 'gemini' && !geminiKey) {
      return null;
    }

    try {
      const requestBody =
        provider === 'gemini'
          ? {
              contents: [
                {
                  parts: [
                    {
                      text: `You are a general-purpose AI assistant. Respond naturally and briefly. If the user asks about Ahmed Yassine Abbane or his portfolio, do not answer from general knowledge; politely redirect them to his portfolio and say you are the portfolio AI assistant. If the user asks casual or off-topic questions, answer normally and say you are an AI agent. Keep it conversational, human, concise, and factual.\n\nUSER QUESTION: ${message}\nATTACHMENTS: ${attachmentSummary || 'none'}`,
                    },
                  ],
                },
              ],
            }
          : {
              model: 'llama-3.1-8b-instant',
              messages: [
                {
                  role: 'system',
                  content:
                    'You are a general-purpose AI assistant. Answer naturally and briefly. If the user asks for information about Ahmed Yassine Abbane or his portfolio, redirect them to the portfolio assistant and do not invent facts. If the user asks off-topic or casual questions, answer as a helpful AI agent. Keep tone conversational, human, and concise.',
                },
                {
                  role: 'user',
                  content: `QUESTION: ${message}\nATTACHMENTS: ${attachmentSummary || 'none'}`,
                },
              ],
              temperature: 0.7,
            };

      const response = await fetch(
        provider === 'gemini'
          ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`
          : 'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(provider === 'groq'
              ? { Authorization: `Bearer ${groqKey}` }
              : {}),
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (provider === 'gemini') {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return typeof text === 'string' && text.trim() ? text.trim() : null;
      }

      const text = data?.choices?.[0]?.message?.content;
      return typeof text === 'string' && text.trim() ? text.trim() : null;
    } catch {
      return null;
    }
  }

  private generateLocalAnswer(message: string, attachmentSummary = ''): string {
    const q = this.withTyposHandled(message);
    const hasAttachmentContext = attachmentSummary
      ? ` I also received ${attachmentSummary} as an attachment.`
      : '';

    if (
      q.includes('skill') ||
      q.includes('stack') ||
      q.includes('tech') ||
      q.includes('language') ||
      q.includes('tool')
    ) {
      return `${this.portfolioContext.name} works mainly with ${this.portfolioContext.skills.slice(0, 8).join(', ')} and also applies design, product, and architecture thinking. His stack is centered around React, Next.js, TypeScript, NestJS, and MongoDB, with UI/UX design and scalable system building as a strong focus.${hasAttachmentContext}`;
    }

    if (
      q.includes('project') ||
      q.includes('portfolio') ||
      q.includes('work') ||
      q.includes('build')
    ) {
      return `${this.portfolioContext.name} is building ${this.portfolioContext.projects[0]} as a flagship product, alongside several full-stack and design-driven portfolio projects. The work focuses on AI, consultations, product strategy, and polished user experiences.${hasAttachmentContext}`;
    }

    if (
      q.includes('experience') ||
      q.includes('background') ||
      q.includes('cv') ||
      q.includes('resume') ||
      q.includes('career')
    ) {
      return `His background combines software engineering, product design, and startup-building. He has experience as a founder, full-stack developer, designer, and software engineering intern, with work spanning frontend systems, backend APIs, architecture, and user-centered product experiences.${hasAttachmentContext}`;
    }

    if (
      q.includes('about') ||
      q.includes('who') ||
      q.includes('you') ||
      q.includes('bio')
    ) {
      return `${this.portfolioContext.summary} He is based in ${this.portfolioContext.location} and is currently focused on ${this.portfolioContext.currentFocus}.${hasAttachmentContext}`;
    }

    if (
      q.includes('education') ||
      q.includes('study') ||
      q.includes('school') ||
      q.includes('university')
    ) {
      return `${this.portfolioContext.name} is an ESTIN student and continues to build knowledge in engineering, software architecture, and applied product development. His education complements his practical work in development and design.${hasAttachmentContext}`;
    }

    if (q.includes('consultify')) {
      return `CONSULTIFY is the main product focus: an AI-powered consultation ecosystem designed to connect users with experts and make specialized knowledge more accessible through modern digital experiences.${hasAttachmentContext}`;
    }

    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('linkedin') ||
      q.includes('hire')
    ) {
      return `You can reach him through LinkedIn: ${this.portfolioContext.contact.linkedin} and the portfolio contact channels. He is actively building in public and is open to full-time, freelance, and product collaboration opportunities.${hasAttachmentContext}`;
    }

    if (q.includes('how') || q.includes('why') || q.includes('can you')) {
      return `Absolutely. Right now, I can help you understand Ahmed Yassine Abbane’s portfolio, technical stack, current work, and project focus. He is especially invested in CONSULTIFY and AI-powered portfolio experiences, with a strong background in full-stack product development.${hasAttachmentContext}`;
    }

    return `${this.portfolioContext.name} is a full-stack developer and designer focused on building modern digital products, AI experiences, and scalable web platforms. Right now, his main focus is ${this.portfolioContext.currentFocus}, and his stack is built around React, TypeScript, Node.js, NestJS, and modern UX-driven development.${hasAttachmentContext}`;
  }

  async generateAnswer(
    message: string,
    attachmentSummary = '',
  ): Promise<string> {
    const normalizedQuestion = this.withTyposHandled(message);

    if (this.isPortfolioQuestion(normalizedQuestion)) {
      return this.generateLocalAnswer(normalizedQuestion, attachmentSummary);
    }

    const externalAnswer = await this.tryExternalLLM(
      normalizedQuestion,
      attachmentSummary,
    );
    if (externalAnswer) {
      return externalAnswer;
    }

    return this.generateLocalAnswer(normalizedQuestion, attachmentSummary);
  }
}
