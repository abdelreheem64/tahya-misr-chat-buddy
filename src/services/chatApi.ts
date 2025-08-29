const WEBHOOK_URL = 'https://submit.tahyamisrsu.com/webhook/Ai-TahyaMisr';

export interface ChatMessage {
  message: string;
  userId: string;
  source: string;
}

export interface ChatResponse {
  output: string;
}

export const sendMessage = async (message: string, userId: string): Promise<string> => {
  try {
    const payload: ChatMessage = {
      message: message.trim(),
      userId,
      source: 'ai-tahyamusr'
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse[] = await response.json();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid response format');
    }

    return data[0].output || 'عذراً، لم أتمكن من فهم طلبك. حاول مرة أخرى.';
    
  } catch (error) {
    console.error('Error sending message:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('حدث خطأ في الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.');
    }
    
    throw new Error('حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى.');
  }
};