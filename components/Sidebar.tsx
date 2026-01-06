import React from 'react';
import { BookData, Chapter, Section } from '../types';
import { Menu, X, BookOpen, ChevronRight } from 'lucide-react';

interface SidebarProps {
  bookData: BookData;
  activeSectionId: string;
  onSectionSelect: (sectionId: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  bookData, 
  activeSectionId, 
  onSectionSelect,
  isOpen,
  toggleSidebar
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out border-r border-slate-800 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3 text-white font-serif font-bold text-xl">
            <BookOpen className="text-indigo-400" />
            <span>Agents</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
            Table of Contents
          </div>
          <nav className="space-y-6">
            {bookData.chapters.map((chapter: Chapter) => (
              <div key={chapter.id}>
                <h3 className="px-2 text-sm font-bold text-white mb-2 font-serif">{chapter.title}</h3>
                <ul className="space-y-1">
                  {chapter.sections.map((section: Section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => {
                          onSectionSelect(section.id);
                          if (window.innerWidth < 768) toggleSidebar();
                        }}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors
                          ${activeSectionId === section.id 
                            ? 'bg-indigo-600 text-white font-medium' 
                            : 'hover:bg-slate-800 hover:text-white text-slate-400'}
                        `}
                      >
                        <span>{section.title}</span>
                        {activeSectionId === section.id && <ChevronRight size={14} />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 text-xs text-slate-500">
          <p>Based on Google Whitepaper</p>
          <p className="mt-1">{bookData.date}</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;