export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  category: 'economy' | 'health' | 'research';
  tags?: string[];
}

export interface Interview {
  id: number;
  title: string;
  interviewee: string;
  role: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl?: string;
  highlightedQuote: string;
}

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  articleId?: number;
  interviewId?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface HealthTip {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface StudyReference {
  id: number;
  title: string;
  authors: string[];
  year: number;
  source: string;
  url?: string;
  description: string;
}
