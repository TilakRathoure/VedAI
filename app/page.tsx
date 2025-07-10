'use client'

import { Button } from '@/components/ui/button';
import { ArrowUpRight, Heading1 } from 'lucide-react';
import React, { useState } from 'react'

const Home = () => {


  const [chat,Setchat]=useState<boolean>(false);


  return (

    <div className='bg-black h-[100vh] text-white'>
    <h2 className="flex justify-end scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 p-4">

        VedAI.
    </h2>

    <Button className=' ' size="lg" variant="secondary">VedAI <ArrowUpRight /></Button>
    </div>

  )
}

export default Home