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
import { motion } from "framer-motion";
import { ArrowDownCircleIcon, LoaderCircle, MessageCircle, Send } from "lucide-react";
import React, { useState } from "react";

const Home = () => {
  const [chat, Setchat] = useState<boolean>(true);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
  } = useChat({ api: "/api/gemini" });

  return (
    <div className="md:px-[100px] lg:px-[150px] bg-black h-[100vh] text-white px-15 py-5">
      {chat && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-15 md:r-[100px] lg:r-[150px] top-25"
        >
          <Card className="w-[60vw] max-w-[500px]">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-lg font-bold">VEDAI.</CardTitle>
              <Button
                onClick={() => {
                  Setchat(!chat);
                }}
                className="h-auto px-3 py-1 text-sm"
              >
                X
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {messages.length === 0 ? (
                  <div className="h-[300px] flex justify-center items-center font-light">
                    No Messages.
                  </div>
                ) : (
                  <div>
                    {messages.map((e, i) => (
                      <div key={i}>{i}</div>
                    ))}
                  </div>
                )}
                {error && (<div>caught error</div>)}
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
                  onClick={()=>{if(isLoading){stop()}}}
                  size="icon"
                >
                  {!isLoading? (<Send/>) : (<LoaderCircle/>)}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      <h2 className="flex justify-end scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0 p-4">
        VedAI.
      </h2>

      <Button
        onClick={() => {
          Setchat(!chat);
        }}
        className=""
        size="lg"
        variant="secondary"
      >
        VedAI {chat ? <ArrowDownCircleIcon /> : <MessageCircle />}
      </Button>
    </div>
  );
};

export default Home;
