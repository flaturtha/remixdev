export default function FeaturedArticles() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="font-breamcatcher text-4xl md:text-5xl font-bold mb-8 text-center tracking-wider">Featured MurderWiki Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ArticleCard 
            title="The Poisoner's Handbook: Infamous Cases of Lethal Deception"
            summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis, justo nec ultricies commodo."
            imageUrl="https://placehold.co/800x450/8b0000/ffffff?text=Poisoner's+Handbook"
            imageAlt="Illustration of vintage poison bottles and lab equipment representing The Poisoner's Handbook article"
            articleUrl="https://murderwiki.talesofmurder.com/articles/poisoners-handbook"
          />
          
          <ArticleCard 
            title="Locked Room Mysteries: The Greatest Unsolved Crimes in Fiction and Reality"
            summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis, justo nec ultricies commodo."
            imageUrl="https://placehold.co/800x450/8b0000/ffffff?text=Locked+Room+Mysteries"
            imageAlt="Illustration of a locked room with mysterious elements representing the Locked Room Mysteries article"
            articleUrl="https://murderwiki.talesofmurder.com/articles/locked-room-mysteries"
          />
          
          <ArticleCard 
            title="The Birth of Forensic Science: How Detectives Learned to Read the Dead"
            summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis, justo nec ultricies commodo."
            imageUrl="https://placehold.co/800x450/8b0000/ffffff?text=Forensic+Science"
            imageAlt="Illustration of early forensic equipment and investigation tools representing The Birth of Forensic Science article"
            articleUrl="https://murderwiki.talesofmurder.com/articles/birth-of-forensic-science"
          />
        </div>
      </div>
    </section>
  );
}

interface ArticleCardProps {
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  articleUrl: string;
}

function ArticleCard({ title, summary, imageUrl, imageAlt, articleUrl }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={imageUrl} 
        alt={imageAlt}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700 mb-4">
          {summary}
        </p>
        <a 
          href={articleUrl} 
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Now
        </a>
      </div>
    </div>
  );
} 