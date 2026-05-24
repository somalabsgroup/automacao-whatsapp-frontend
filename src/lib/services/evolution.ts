import axios from 'axios';

const EVOLUTION_API_URL = process.env.NEXT_PUBLIC_EVOLUTION_API_URL || 'https://api.somaclini.com.br';
const EVOLUTION_API_KEY = process.env.NEXT_PUBLIC_EVOLUTION_API_KEY || '';

export interface SendTextMessageParams {
  tenantId: string;
  phoneNumber: string;
  text: string;
  options?: {
    delay?: number;
    presence?: 'composing' | 'recording';
    linkPreview?: boolean;
  };
}

export interface EvolutionMessageResponse {
  key?: {
    id?: string;
    remoteJid?: string;
    fromMe?: boolean;
  };
  message?: any;
  messageTimestamp?: number;
  status?: string;
}

/**
 * Envia mensagem de texto via Evolution API
 */
export async function sendTextMessage(params: SendTextMessageParams): Promise<EvolutionMessageResponse> {
  const { tenantId, phoneNumber, text, options } = params;

  if (!EVOLUTION_API_KEY) {
    throw new Error('Evolution API key not configured');
  }

  const response = await axios.post<EvolutionMessageResponse>(
    `${EVOLUTION_API_URL}/message/sendText/${tenantId}`,
    {
      number: phoneNumber,
      text,
      options: {
        delay: options?.delay ?? 1200,
        presence: options?.presence ?? 'composing',
        linkPreview: options?.linkPreview ?? true,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
    }
  );

  return response.data;
}

/**
 * Envia mensagem com mídia via Evolution API
 */
export async function sendMediaMessage(params: {
  tenantId: string;
  phoneNumber: string;
  mediaUrl: string;
  caption?: string;
  mediaType: 'image' | 'video' | 'audio' | 'document';
}): Promise<EvolutionMessageResponse> {
  const { tenantId, phoneNumber, mediaUrl, caption, mediaType } = params;

  if (!EVOLUTION_API_KEY) {
    throw new Error('Evolution API key not configured');
  }

  const response = await axios.post<EvolutionMessageResponse>(
    `${EVOLUTION_API_URL}/message/sendMedia/${tenantId}`,
    {
      number: phoneNumber,
      mediatype: mediaType,
      media: mediaUrl,
      caption,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
    }
  );

  return response.data;
}
