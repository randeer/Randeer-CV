import React from 'react';

interface SkillsCloudProps {
  skills: string[];
}

export const SkillsCloud: React.FC<SkillsCloudProps> = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-gray-800 text-sky-300 text-sm font-medium px-3 py-1.5 rounded-full ring-1 ring-white/10 transition-transform duration-200 hover:scale-105 hover:bg-gray-700"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};