import { LucideIcon } from "lucide-react";
import { Book, Heart, Layers } from 'lucide-react';

interface ValueItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

export default function PreservationValues() {
  const values: ValueItemProps[] = [
    {
      icon: Book,
      title: "Thoughtfully Preserved",
      description: "We painstakingly restore original texts, preserving their authenticity while making them accessible to modern readers."
    },
    {
      icon: Layers,
      title: "Contextually Enriched",
      description: "Our editions are designed to elevate the original work with historical context, author backgrounds, and literary significance."
    },
    {
      icon: Heart,
      title: "Giving Back",
      description: "Every time you purchase one of our books, we donate a portion of proceeds to literary preservation organizations."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-xl text-gray-600 mb-16 text-center">What we stand for</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <ValueItem 
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              iconColor={value.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueItem({ icon: Icon, title, description, iconColor = "#8b0000" }: ValueItemProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <Icon size={48} style={{ color: iconColor }} />
      </div>
      <h4 className="font-bold text-xl mb-4">{title}</h4>
      <p className="text-gray-700">
        {description}
      </p>
    </div>
  );
} 