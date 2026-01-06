import React from 'react';

export interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

export interface BookData {
  title: string;
  authors: string[];
  date: string;
  chapters: Chapter[];
}