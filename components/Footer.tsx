import React from 'react';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/randeer-lalanga/', icon: 'M16 8a6 6 0 01-6 6H6a2 2 0 01-2-2V6a2 2 0 012-2h4a6 6 0 016 6zM12 6a2 2 0 100 4 2 2 0 000-4zM6 12a2 2 0 100 4h4a2 2 0 100-4H6z' },
  { name: 'GitHub', url: 'https://github.com/randeer', icon: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1 0-1.3-.5-2.4-1.2-3.2.1-.3.5-1.5-.1-3.2 0 0-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.1 2.8 5 3.1 5 3.1c-.6 1.7-.2 2.9-.1 3.2-.7.8-1.2 1.9-1.2 3.2 0 4.6 2.7 5.8 5.5 6.1-.6.5-.9 1.2-.9 2.3v3.5' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-8 md:space-y-0">
          
          <div className="text-gray-400">
            <p className="font-bold text-white text-lg">Contact Details</p>
            <p className="mt-2 text-sm">“Chintha”, Kadirandola, Elpitiya</p>
            <p className="text-sm">Mobile: 0773064421</p>
            <p className="text-sm">Email: <a href="mailto:randeerlalanga92@gmail.com" className="text-sky-400 hover:underline">randeerlalanga92@gmail.com</a></p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6">
                {socialLinks.map((link) => (
                    <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-sky-400 transition-colors duration-200"
                    aria-label={link.name}
                    >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
                    </svg>
                    </a>
                ))}
            </div>
             <p className="mt-4 text-xs text-gray-500">&copy; {new Date().getFullYear()} Randeer Lalanga. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
