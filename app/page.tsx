"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownCircleIcon,
  LoaderCircle,
  MessageCircle,
  Send,
} from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import geminiimage from "@/public/Build_with_Gemini_dk_16_9_1.width-1200.format-.jpeg"

const Home = () => {
  const [chat, setChat] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
  } = useChat({ api: "api/gemini" });

  return (
    <div className="relative text-white min-h-screen">
      <Image
        alt="gemini"
        src={geminiimage}
        fill
        className="object-cover object-top-left z-[-1]"
        priority
      />

      <div className="md:px-[100px] lg:px-[150px] px-8 py-[100px] bg-black/70 min-h-screen">
        <AnimatePresence>
          {chat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed right-6 md:right-[100px] lg:right-[150px] top-25 z-10"
            >
              <Card className="w-[60vw] max-w-[500px]">
                <CardHeader className="flex justify-between">
                  <CardTitle className="text-lg font-bold">VEDAI.</CardTitle>
                  <Button
                    onClick={() => setChat(false)}
                    className="h-auto px-3 py-1 text-sm"
                  >
                    X
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-2">
                    {messages.length === 0 ? (
                      <div className="h-[300px] flex justify-center items-center font-light">
                        No Messages.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        {messages.map((e, i) => (
                          <div
                            key={i}
                            className={`text-white px-4 p-2 rounded-2xl ${
                              e.role !== "user"
                                ? "self-start bg-gray-500"
                                : "self-end bg-black"
                            }`}
                          >
                            <ReactMarkdown>{e.content}</ReactMarkdown>
                          </div>
                        ))}
                      </div>
                    )}
                    {error && (
                      <div className="text-red-500">
                        <pre>{error.message}</pre>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSubmit} className="flex w-full gap-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      className="flex-1"
                      placeholder="Type your message here..."
                    />
                    <Button
                      type="submit"
                      className="size-9"
                      onClick={() => {
                        if (isLoading) stop();
                      }}
                      size="icon"
                    >
                      {!isLoading ? <Send /> : <LoaderCircle className="animate-spin" />}
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="flex justify-end pb-2 text-3xl font-bold tracking-tight p-4">
          VedAI.
        </h2>

        <p className="text-lg font-light my-5 mb-10">
          VedAI is an AI-powered chatbot built using Google&apos;s Gemini 1.5 Flash model
          and integrated with the Vercel AI SDK for seamless performance. Whether
          you&apos;re chatting, learning, or exploring, VedAI is here to assist with speed,
          accuracy, and a growing understanding of the world around you.
        </p>

        <Button
          onClick={() => setChat(!chat)}
          size="lg"
          variant="secondary"
        >
          VedAI {chat ? <ArrowDownCircleIcon /> : <MessageCircle />}
        </Button>
      </div>
    </div>
  );
};

export default Home;
