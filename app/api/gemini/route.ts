import { initialmessage } from "@/lib/data";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText,Message } from "ai";

const google = createGoogleGenerativeAI({
  apiKey:process.env.GOOGLE_API_KEY
});

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildgoogle = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: initialmessage.content,
  },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

export const POST=async(request: Request)=>{
  const { messages } = await request.json();

  const stream = await streamText({
    model: google("gemini-1.5-flash"),
    messages: buildgoogle(messages),
    temperature: 0.7,
  });

  return stream.toDataStreamResponse();
}
