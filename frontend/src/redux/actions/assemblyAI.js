// npm install assemblyai
import { AssemblyAI } from 'assemblyai';

export const transcribeAudio = async () => {
    const client = new AssemblyAI({
      apiKey: '600b6d4cdedb47b889d062b101f98dce',
    });
    const audioUrl =
      'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'

    const config = {
      audio_url: audioUrl,
    };
    const transcript = await client.transcripts.transcribe(config);
    console.log(transcript.text);
  };
