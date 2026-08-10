'use client'; // <-- Add this exactly at the top

import { KeyboardScene } from '@/components/3d/KeyboardScene';
import { HomeCards } from '@/components/home/home-cards';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full gap-1 p-2 px-6 overflow-hidden shadow-2xl dark:shadow-[0_0_12px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.05)]">
        {/* Main Content - Left Side */}
        <motion.div
          className="flex min-w-0 w-[55%] flex-col"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
        >
          {/* Intro */}
          <section>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="text-[9px] font-semibold leading-none text-primary bg-surface-brand inline px-4 py-1 rounded-[2px]"
            >
              Salutations
            </motion.p>
            <div className="flex flex-col gap-1">
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className="text-[9px] font-semibold leading-none text-primary mt-1"
              >
                Workspace Initialized
              </motion.p>

              {/* NAME — intentionally NOT reduced */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="text-[55px] uppercase leading-[0.65]"
              >
                <span className="font-beni block text-foreground">AHMED YASSINE</span>
                <span className="font-beni block text-primary">ABBANE</span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8, delay: 0.4 } },
                }}
                className="max-w-[400px] text-[9px] leading-[1] text-foreground"
              >
                Full Stack Web Developer & Graphic Designer
                <br />
                Building digital experiences through code & design.
              </motion.p>
            </div>
          </section>

          {/* Cards */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            <HomeCards />
          </motion.div>
        </motion.div>

        {/* Right Side - 3D Keyboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex h-full w-[45%] flex-col overflow-hidden rounded-xs shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
        >
          <div className="h-full w-full flex-1 ">
            <KeyboardScene />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed bottom-11.5 left-[50%] translate-x-[-50%] z-10 bg-background rounded-[8px] shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
        >
          <h2 className="font-inter text-sm font-bold mx-6 my-3">
            Welcome to the Developer Environment
          </h2>
          <div className="relative">
            <div className="fixed -top-9 z-20 p-3 left-[50%] translate-x-[-50%] bg-brand-dark rounded-sm shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
              <Code className="size-5" color="#FFFFFF" strokeWidth={1.8} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
