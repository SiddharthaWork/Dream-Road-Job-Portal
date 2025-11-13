"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import React, { type ComponentPropsWithoutRef, useEffect, useMemo, useState } from "react"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0.9, opacity: 0, y: 30, rotateX: 15 },
    animate: { scale: 1, opacity: 1, y: 0, rotateX: 0 },
    exit: { scale: 0.9, opacity: 0, y: -30, rotateX: -15 },
    
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0,
    },
  }
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 30, rotateX: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: -30, rotateX: -15 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.6 }}
      layout
      className="mx-auto w-full perspective-1000"
    >
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
  const [index, setIndex] = useState(0)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  useEffect(() => {
    if (index < childrenArray.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [index, delay, childrenArray.length])

  const itemsToShow = useMemo(() => {
    const result = childrenArray.slice(0, index + 1).reverse()
    return result
  }, [index, childrenArray])

  return (
    <div className={cn(`flex flex-col items-center gap-4`, className)} {...props}>
      <AnimatePresence mode="popLayout">
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
})

AnimatedList.displayName = "AnimatedList"
