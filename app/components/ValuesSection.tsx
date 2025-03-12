import { LucideIcon } from "lucide-react";

interface ValueItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

interface ValuesSectionProps {
  heading: string;
  values: ValueItemProps[];
}

export default function ValuesSection({ heading, values }: ValuesSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-xl text-gray-600 mb-16 text-center">{heading}</h3>
        
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