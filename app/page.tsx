import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowDownCircle, ArrowDownCircleIcon, Loader2, MessageCircle, Send, X } from 'lucide-react'
import React from 'react'
import {useChat} from "@ai-sdk/react"

const Home = () => {
  return (
    <div>

      <X/>
      <MessageCircle/>
      <Send/>
      <Loader2/>
      <ArrowDownCircleIcon/>
      

    </div>
  )
}

export default Home