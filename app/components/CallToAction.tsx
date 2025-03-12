import { Link } from "@remix-run/react";

interface CallToActionButton {
  text: string;
  link: string;
  primary?: boolean;
}

interface CallToActionProps {
  heading: string;
  description: string;
  backgroundColor?: string;
  textColor?: string;
  buttons: CallToActionButton[];
}

export default function CallToAction({ 
  heading, 
  description, 
  backgroundColor = "#8b0000", 
  textColor = "white",
  buttons 
}: CallToActionProps) {
  return (
    <section 
      className="py-20 text-center"
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-6">{heading}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Link 
              key={index}
              to={button.link} 
              className={button.primary 
                ? `bg-white text-[${backgroundColor}] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors`
                : `border-2 border-${textColor} text-${textColor} px-6 py-3 rounded-md hover:bg-white/10 transition-colors`
              }
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 