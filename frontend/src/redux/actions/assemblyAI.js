// npm install assemblyai
import { AssemblyAI } from 'assemblyai';

export const transcribeAudio = async (audioUrl) => {
  const client = new AssemblyAI({
    apiKey: '600b6d4cdedb47b889d062b101f98dce',
  });

  const config = {
    audio_url: audioUrl,
  };
  const transcript = await client.transcripts.transcribe(config);

  return transcript.text;
};
