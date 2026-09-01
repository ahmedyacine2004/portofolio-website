export interface AssistantAttachment {
  type?: 'image' | 'text';
  name?: string;
  url?: string;
  data?: string;
}

export interface AssistantReply {
  reply: string;
  timestamp: string;
}

export interface AssistantResponse {
  success: boolean;
  message: string;
  data: AssistantReply | null;
}

export async function askAssistant(
  message: string,
  attachments: AssistantAttachment[] = [],
): Promise<AssistantResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

  const response = await fetch(`${apiBaseUrl}/ai/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      message,
      attachments,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Assistant request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as Partial<AssistantResponse> & {
    data?: (Partial<AssistantReply> & { reply?: string }) | null;
    reply?: string;
  };

  const replyText = payload?.data?.reply ?? payload?.reply ?? '';

  return {
    success: payload.success ?? true,
    message: payload.message ?? 'Assistant answer generated successfully',
    data: {
      reply: replyText,
      timestamp: payload.data?.timestamp ?? new Date().toISOString(),
    },
  };
}
