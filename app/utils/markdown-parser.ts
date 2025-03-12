import fs from 'fs';
import path from 'path';

interface NovelChapter {
  number: string;
  title: string;
  content: string;
}

export interface NovelData {
  title: string;
  author: string;
  publisherInfo: string;
  type: string;
  firstEdition: string;
  id: string;
  copyright: string;
  coverImage: string;
  chapters: NovelChapter[];
}

/**
 * Parse a markdown file containing a novel and extract its structure
 * @param filePath Path to the markdown file
 * @returns Structured novel data
 */
export async function parseNovelMarkdown(filePath: string): Promise<NovelData> {
  try {
    // Read the markdown file
    const markdownContent = fs.readFileSync(filePath, 'utf-8');
    const lines = markdownContent.split('\n');
    
    // Extract metadata from the beginning of the file
    let lineIndex = 0;
    
    // First line is the title (repeated)
    const title = lines[lineIndex++].trim();
    lineIndex++; // Skip the repeated title
    
    // Extract author
    const authorLine = lines[lineIndex++].trim();
    const author = authorLine.startsWith('By ') ? authorLine.substring(3) : authorLine;
    
    // Extract publisher info
    const publisherInfo = lines[lineIndex++].trim();
    
    // Extract type
    const type = lines[lineIndex++].trim();
    
    // Extract first edition date
    const firstEditionLine = lines[lineIndex++].trim();
    const firstEdition = firstEditionLine.startsWith('first edition ') 
      ? firstEditionLine.substring(14) 
      : firstEditionLine;
    
    // Extract ID
    const id = lines[lineIndex++].trim();
    
    // Extract copyright information (usually spans multiple lines)
    let copyright = '';
    while (lineIndex < lines.length && !lines[lineIndex].includes('Contents')) {
      const line = lines[lineIndex++].trim();
      if (line) {
        copyright += (copyright ? ' ' : '') + line;
      }
    }
    
    // Skip to after the Contents header
    while (lineIndex < lines.length && !lines[lineIndex].includes('Chapter 1')) {
      lineIndex++;
    }
    
    // Now parse chapters
    const chapters: NovelChapter[] = [];
    let currentChapter: NovelChapter | null = null;
    let chapterContent = '';
    
    while (lineIndex < lines.length) {
      const line = lines[lineIndex++];
      
      // Check if this is a new chapter header
      const chapterMatch = line.match(/^Chapter (\d+)/i);
      
      if (chapterMatch && lineIndex < lines.length) {
        // Save the previous chapter if there is one
        if (currentChapter) {
          currentChapter.content = chapterContent.trim();
          chapters.push(currentChapter);
          chapterContent = '';
        }
        
        // Start a new chapter
        const chapterNumber = chapterMatch[1];
        // The next line should be the chapter title
        const chapterTitle = lines[lineIndex++].trim();
        
        currentChapter = {
          number: chapterNumber,
          title: chapterTitle,
          content: ''
        };
      } else if (currentChapter) {
        // Add to current chapter content
        chapterContent += line + '\n';
      }
    }
    
    // Don't forget to add the last chapter
    if (currentChapter) {
      currentChapter.content = chapterContent.trim();
      chapters.push(currentChapter);
    }
    
    // Default cover image path - in a real implementation, this would be determined differently
    const coverImage = `/images/novels/${path.basename(filePath, '.md')}-cover.jpg`;
    
    return {
      title,
      author,
      publisherInfo,
      type,
      firstEdition,
      id,
      copyright,
      coverImage,
      chapters
    };
  } catch (error) {
    console.error('Error parsing novel markdown:', error);
    throw error;
  }
} 