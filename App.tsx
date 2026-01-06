import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentViewer from './components/ContentViewer';
import ChatAssistant from './components/ChatAssistant';
import { bookContent } from './data/bookContent';
import { Section, Chapter } from './types';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('introduction');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Find current section and chapter data
  let currentSection: Section | undefined;
  let currentChapter: Chapter | undefined;

  for (const chapter of bookContent.chapters) {
    const section = chapter.sections.find(s => s.id === activeSectionId);
    if (section) {
      currentSection = section;
      currentChapter = chapter;
      break;
    }
  }

  // Fallback if not found
  if (!currentSection || !currentChapter) {
    currentChapter = bookContent.chapters[0];
    currentSection = currentChapter.sections[0];
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar 
        bookData={bookContent} 
        activeSectionId={activeSectionId}
        onSectionSelect={setActiveSectionId}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <ContentViewer 
        section={currentSection}
        chapterTitle={currentChapter.title}
        bookData={bookContent}
        onNavigate={(id) => {
          setActiveSectionId(id);
          // Scroll to top of viewer on navigation
          const mainElement = document.querySelector('main');
          if (mainElement) mainElement.scrollTop = 0;
        }}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <ChatAssistant />
    </div>
  );
};

export default App;