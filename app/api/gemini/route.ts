
import { initialmessage } from "@/lib/data";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Message } from "@ai-sdk/react";


const google=createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || ""
})

export const runtime ="edge";

const generateId =()=> Math.random().toString(36).slice(2,15);




const buildgoogle =(message :Message[]):Message[]=>[

    {

        id:generateId(),
        role:"user",
        content:initialmessage.content

    },

    ...message.map((message)=>({

        id:message.id || generateId(),
        role:message.role,
        content:message.content

    })),

];


export async function POST(request:Request) {

    const {messages}=await request.json();
    const stream =await streamText({
        model:google("gemini-pro"),
        message:buildgoogle(messages),
        temperature:0.7,
    });

    return stream.toDataStreamResponse();
    
}

