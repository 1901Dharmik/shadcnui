import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export default function AccessDenied() {
  const router = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <motion.div 
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          className="bg-gradient-to-b from-red-800 to-transparent bg-clip-text text-[10rem] font-bold leading-none text-transparent inline-block"
          variants={itemVariants}
        >
          401
        </motion.span>
        <motion.h2 
          className="font-heading my-2 text-2xl font-bold"
          variants={itemVariants}
        >
          You Don&apos;t Have Permission To Access This Page
        </motion.h2>
        <motion.p variants={itemVariants}>
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </motion.p>
        <motion.div 
          className="mt-8 flex justify-center gap-2"
          variants={itemVariants}
        >
          <Button onClick={() => router.back()} variant="default" size="lg">
            Go back
          </Button>
          <Button className="bg-muted"
            onClick={() => router.push('/admin')}
            variant="ghost"
            size="lg"
          >
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}