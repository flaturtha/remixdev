import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { parseNovelMarkdown, type NovelData } from "~/utils/markdown-parser";
import path from "path";
import {
  NovelContainer,
  NovelHeader,
  NovelCoverImage,
  NovelHeading,
  NovelParagraph,
  NovelContents,
  ChapterTitle,
  NovelMetadata,
  NovelEndMarker
} from "~/components/novel/NovelTypography";

// In a real implementation, this would come from Sanity
async function getNovelData(slug: string): Promise<NovelData> {
  try {
    // For now, we'll just read from the markdown file
    // In a real implementation, this would fetch from Sanity
    const filePath = path.resolve("/run/media/h/Working/Documents/1_pulpeteers-press/2025/novels/bat-wing/working/md/bat-wing.md");
    
    // Parse the markdown file
    const novelData = await parseNovelMarkdown(filePath);
    
    // Set the correct cover image path
    if (slug === "bat-wing") {
      novelData.coverImage = "/images/book-covers/bat-wing_cover.png";
    }
    
    return novelData;
  } catch (error) {
    console.error(`Error fetching novel data for ${slug}:`, error);
    throw new Response("Novel not found", { status: 404 });
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) throw new Response("Not found", { status: 404 });
  
  try {
    const novelData = await getNovelData(slug);
    return json({ novel: novelData });
  } catch (error) {
    console.error("Error in loader:", error);
    throw new Response("Novel not found", { status: 404 });
  }
}

export default function NovelReadPage() {
  const { novel } = useLoaderData<typeof loader>();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Set up reading position tracking (optional enhancement)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const chapterNumber = entry.target.getAttribute('data-chapter');
            if (chapterNumber) {
              // Could save reading position to localStorage here
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all chapter headers
    document.querySelectorAll('.chapter-header').forEach(chapter => {
      observer.observe(chapter);
    });
    
    return () => observer.disconnect();
  }, []);

  // Function to split content into paragraphs
  const renderChapterContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => (
      <NovelParagraph 
        key={idx} 
        isFirstParagraph={idx === 0}
      >
        {paragraph}
      </NovelParagraph>
    ));
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <NovelContainer>
          {/* Back to Library Button */}
          <div className="mb-6">
            <a 
              href="/library/novels" 
              className="inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Library
            </a>
          </div>
          
          {/* Novel Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NovelHeader>
              {/* Novel Cover */}
              <NovelCoverImage 
                src={novel.coverImage}
                alt={`${novel.title} by ${novel.author}`}
                className="max-w-[280px]"
              />
              
              {/* Title and Author */}
              <NovelHeading level={1}>
                {novel.title}
              </NovelHeading>
              <h2 className="text-xl sm:text-2xl mb-6 font-medium text-gray-700 dark:text-gray-300">
                by <span className="italic">{novel.author}</span>
              </h2>
              
              {/* Metadata */}
              <NovelMetadata
                publisherInfo={novel.publisherInfo}
                type={novel.type}
                firstEdition={novel.firstEdition}
                id={novel.id}
                copyright={novel.copyright}
              />
              
              {/* Premium Version Button */}
              <div className="mt-8">
                <a 
                  href={`/novels/${params.slug}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Get Premium Edition
                </a>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Premium editions include enhanced typography, illustrations, and bonus content.
                </p>
              </div>
            </NovelHeader>
          </motion.div>
          
          {/* Table of Contents */}
          <NovelContents chapters={novel.chapters} />
          
          {/* Chapters */}
          <div className="chapters-section space-y-20">
            {novel.chapters.map((chapter, index) => (
              <div 
                key={index} 
                className="chapter"
                data-chapter={chapter.number}
              >
                <ChapterTitle 
                  number={chapter.number} 
                  title={chapter.title} 
                />
                <div className="chapter-content prose prose-stone dark:prose-invert prose-lg mx-auto">
                  {renderChapterContent(chapter.content)}
                </div>
              </div>
            ))}
          </div>
          
          {/* End of novel marker */}
          <NovelEndMarker />
          
          {/* Call to Action at the End */}
          <div className="my-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Enjoyed this story?</h3>
            <p className="mb-4">Get the premium edition with enhanced typography, illustrations, and bonus content.</p>
            <a 
              href={`/novels/${params.slug}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Get Premium Edition
            </a>
          </div>
        </NovelContainer>
      </AnimatePresence>
    </MotionConfig>
  );
} 