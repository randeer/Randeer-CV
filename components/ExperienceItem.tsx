import React from 'react';
import type { Experience } from '../types';

interface ExperienceItemProps {
  experience: Experience;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="relative pl-8 border-l-2 border-gray-700 group transition-all duration-300">
      <div className="absolute -left-[11px] top-1 w-5 h-5 bg-gray-900 border-2 border-sky-400 rounded-full transition-all duration-300 group-hover:scale-125 group-hover:bg-sky-400"></div>
      
      <div className="transition-transform duration-300 group-hover:translate-x-2">
        <p className="text-sm text-sky-400 font-medium">{experience.date}</p>
        <h3 className="mt-1 text-xl font-semibold text-white">{experience.title}</h3>
        <p className="text-md text-gray-400">{experience.company} &middot; {experience.location}</p>
        <ul className="mt-4 list-disc list-inside space-y-2 text-gray-400">
          {experience.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};