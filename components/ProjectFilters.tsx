import React from 'react';

interface ProjectFiltersProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({ tags, selectedTag, onSelectTag }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map(tag => {
        const isSelected = tag === selectedTag;
        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-sky-500
              ${
                isSelected
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};