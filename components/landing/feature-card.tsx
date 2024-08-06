'use client';

import { LucideIcon } from 'lucide-react';

export default function FeatureCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <li className="rounded-2xl border border-gray-200 p-8 relative transform transition-transform duration-300 hover:scale-105">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)]">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.03] stroke-black/5 dark:fill-current dark:stroke-current dark:opacity-[0.04]"
        >
          <defs>
            <pattern
              id="pattern"
              width="72"
              height="56"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="16"
            >
              <path
                d="M.5 56V.5H72"
                fill="none"
              ></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#pattern)"
          ></rect>
          <svg
            x="50%"
            y="16"
            className="overflow-visible"
          >
            <rect
              strokeWidth="0"
              width="73"
              height="57"
              x="0"
              y="56"
            ></rect>
            <rect
              strokeWidth="0"
              width="73"
              height="57"
              x="-73"
              y="169"
            ></rect>
            <rect
              strokeWidth="0"
              width="73"
              height="57"
              x="72"
              y="168"
            ></rect>
          </svg>
        </svg>
      </div>

      <div className="relative z-10">
        <Icon className="text-muted-foreground" />
        <h3 className="mt-6 font-semibold tracking-wide text-lg leading-6">
          {title}
        </h3>
        <p className="leading-6 text-muted-foreground mt-2">{description}</p>
      </div>
    </li>
  );
}
