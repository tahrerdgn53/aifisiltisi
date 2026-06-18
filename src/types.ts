/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AITool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  url: string;
  logo: string; // Icon identifier or Emoji
  upvotes: number;
  bookmarks: boolean;
  tags: string[];
  featured: boolean;
  addedByUser?: boolean;
  developer?: string;
  pricing: 'Ücretsiz' | 'Freemium' | 'Ücretli';
}

export interface AINews {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl?: string;
  source: string;
  author: string;
  upvotes: number;
  commentsCount: number;
}

export interface ToolCategory {
  id: string;
  label: string;
  icon: string; // Lucide icon string
}

export interface Comment {
  id: string;
  targetId: string; // Tool id or News id
  username: string;
  commentText: string;
  date: string;
}
