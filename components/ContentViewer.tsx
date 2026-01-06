import React from 'react';
import { Section, Chapter, BookData } from '../types';
import { ArrowLeft, ArrowRight, Menu } from 'lucide-react';

interface ContentViewerProps {
  section: Section;
  chapterTitle: string;
  bookData: BookData;
  onNavigate: (sectionId: string) => void;
  toggleSidebar: () => void;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ 
  section, 
  chapterTitle, 
  bookData, 
  onNavigate,
  toggleSidebar 
}) => {
  
  // Logic to find previous and next sections
  const allSections = bookData.chapters.flatMap(c => c.sections);
  const currentIndex = allSections.findIndex(s => s.id === section.id);
  const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null;
  const nextSection = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;

  return (
    <main className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-white">
      {/* Top Bar for Mobile */}
      <div className="md:hidden sticky top-0 bg-white/90 backdrop-blur border-b border-slate-200 p-4 flex items-center gap-3 z-30">
        <button onClick={toggleSidebar} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Menu size={24} />
        </button>
        <span className="font-serif font-bold text-slate-800">Agents</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-2 text-indigo-600 font-medium text-sm uppercase tracking-wide">
          {chapterTitle}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 font-serif leading-tight">
          {section.title}
        </h1>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
          {section.content}
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
          {prevSection ? (
            <button 
              onClick={() => onNavigate(prevSection.id)}
              className="group flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all w-full sm:w-1/2"
            >
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-1 group-hover:text-indigo-600">
                <ArrowLeft size={16} /> Previous
              </div>
              <div className="text-slate-800 font-serif font-bold group-hover:text-indigo-900 text-left">
                {prevSection.title}
              </div>
            </button>
          ) : <div className="hidden sm:block w-1/2" />}

          {nextSection ? (
            <button 
              onClick={() => onNavigate(nextSection.id)}
              className="group flex flex-col items-end p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all w-full sm:w-1/2"
            >
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-1 group-hover:text-indigo-600">
                Next <ArrowRight size={16} />
              </div>
              <div className="text-slate-800 font-serif font-bold group-hover:text-indigo-900 text-right">
                {nextSection.title}
              </div>
            </button>
          ) : <div className="hidden sm:block w-1/2" />}
        </div>
      </div>
    </main>
  );
};

export default ContentViewer;