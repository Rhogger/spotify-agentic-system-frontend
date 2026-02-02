import type { Message } from '~/models/message';
import type { AgentChatResponse } from '~/models/agent';

export const useAgentChat = () => {
  const messages = useState<Message[]>('chat-messages', () => [
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Bem-vindo! Sou seu assistente musical. Como posso ajudar?',
      parts: [
        {
          type: 'text',
          text: 'Bem-vindo! Sou seu assistente musical. Como posso ajudar?',
        },
      ],
    },
  ]);
  const isLoading = useState('chat-loading', () => false);
  const error = useState<string | null>('chat-error', () => null);

  const config = useRuntimeConfig();
  const apiBase = config.public.apiBaseUrl;
  const { token } = useAuth();

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    console.log('Sending message to agent:', content);

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content,
      parts: [{ type: 'text', text: content }],
    };

    messages.value.push(userMessage);

    try {
      const response = await $fetch<AgentChatResponse>(
        `${apiBase}/agent/chat`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: { message: content },
        },
      );

      console.log('Agent response:', response);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.response,
        parts: [{ type: 'text', text: response.response }],
        tracks: response.tracks || undefined,
        playlists: response.playlists || undefined,
      };

      messages.value.push(assistantMessage);
    } catch (e: any) {
      console.error('Chat error:', e);
      error.value =
        'Ocorreu um erro ao falar com o assistente. Tente novamente.';

      messages.value.push({
        id: Date.now() + 2,
        role: 'assistant',
        content:
          'Desculpe, tive um problema ao processar sua solicitação. Pode tentar de novo?',
        parts: [
          {
            type: 'text',
            text: 'Desculpe, tive um problema ao processar sua solicitação. Pode tentar de novo?',
          },
        ],
      });
    } finally {
      isLoading.value = false;
    }
  };

  const resetSession = async () => {
    try {
      await $fetch(`${apiBase}/agent/session/reset`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      messages.value = [
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Sessão reiniciada. Como posso ajudar agora?',
          parts: [
            {
              type: 'text',
              text: 'Sessão reiniciada. Como posso ajudar agora?',
            },
          ],
        },
      ];
    } catch (e) {
      console.error('Reset session error:', e);
    }
  };

  const fetchSession = async () => {
    if (!token.value) return;

    try {
      const response = await $fetch<any>(`${apiBase}/agent/session`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      if (response && response.events) {
        const recoveredMessages: Message[] = response.events
          .map((event: any) => {
            // Regex to extract text from content string: Part(text='...')
            // Handles multiline and escaped characters better
            const textMatch = event.content.match(
              /text='([\s\S]*?)'(?:, |\]|\))/,
            );
            const text = textMatch ? textMatch[1] : '';

            if (!text) return null;

            return {
              id: event.id,
              role: event.author === 'orchestrator' ? 'assistant' : 'user',
              content: text,
              parts: [{ type: 'text', text }],
            } as Message;
          })
          .filter((m: any) => m !== null);

        if (recoveredMessages.length > 0) {
          messages.value = [
            {
              id: 'welcome',
              role: 'assistant',
              content: 'Bem-vindo de volta! Como posso ajudar?',
              parts: [
                {
                  type: 'text',
                  text: 'Bem-vindo de volta! Como posso ajudar?',
                },
              ],
            },
            ...recoveredMessages,
          ];
        }
      }
    } catch (e) {
      console.error('Fetch session error:', e);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetSession,
    fetchSession,
  };
};
