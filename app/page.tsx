'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { ArrowDownCircleIcon, MessageCircle } from 'lucide-react';
import React, { useState } from 'react'

const Home = () => {


  const [chat,Setchat]=useState<boolean>(true);


  return (

    <div className='bg-black h-[100vh] text-white'>

      {chat && (      <motion.div initial={{opacity:0,scale:0.5}} transition={{duration:0.2}} animate={{opacity:1, scale:1}} exit={{opacity:0,scale:0.8}} className='fixed bg-white'>
        <Card>
        <CardHeader className='flex'>
          <CardTitle className='text-lg'>
            VEDAI.
          </CardTitle>
          <Button onClick={()=>{Setchat(!chat)}} size="sm">X</Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[300px]'>
            <div className='w-full'>No Messages.</div>
          </ScrollArea>
        </CardContent>
        </Card></motion.div>)}


    <h2 className="flex justify-end scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 p-4">

        VedAI.
    </h2>

    <Button onClick={()=>{Setchat(!chat)}} className=' ' size="lg" variant="secondary">VedAI {chat ? (<ArrowDownCircleIcon/>) : (<MessageCircle/>)}</Button>
    </div>

  )
}

export default Home