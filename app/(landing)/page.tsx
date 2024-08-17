'use client';

import FeatureCard from '@/components/landing/feature-card';
import { motion } from 'framer-motion';
import {
  Database,
  Lock,
  Palette,
  ShieldCheck,
  Triangle,
  Type,
} from 'lucide-react';

export default function Landing() {
  return (
    <>
      <section className="mx-10 space-y-6 pb-16 pt-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <motion.h1
            className="text-5xl lg:text-6xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            PrismaNext
          </motion.h1>

          <motion.h2
            className="mt-3 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            A Batteries Included Template For Your Next Adventure
          </motion.h2>
        </div>
      </section>

      <section className="mx-10 space-y-6">
        <motion.div
          className="container flex max-w-[68rem] flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.7,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3">
            <FeatureCard
              Icon={Triangle}
              title="Next.js"
              description="The React Framework for the Web."
            />
            <FeatureCard
              Icon={Palette}
              title="Tailwind CSS"
              description="Rapidly build modern websites without ever leaving your HTML."
            />
            <FeatureCard
              Icon={Type}
              title="TypeScript"
              description="TypeScript is JavaScript with syntax for types."
            />
            <FeatureCard
              Icon={Lock}
              title="Auth.js"
              description="Authentication with Google SSO enabled."
            />
            <FeatureCard
              Icon={ShieldCheck}
              title="Zod"
              description="TypeScript-first schema validation with static type inference."
            />
            <FeatureCard
              Icon={Database}
              title="TanStack Query"
              description="The missing data-fetching library for web applications."
            />
          </ul>
        </motion.div>
      </section>
    </>
  );
}
