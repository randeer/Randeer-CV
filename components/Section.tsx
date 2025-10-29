import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6 relative">
        <span className="relative z-10">{title}</span>
        <span className="absolute -left-2 -top-1 w-12 h-8 bg-sky-500/20 rounded-lg z-0"></span>
      </h2>
      <div>{children}</div>
    </section>
  );
};
