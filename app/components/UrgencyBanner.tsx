export default function UrgencyBanner({ text }: { text: string }) {
  return (
    <div className="text-[#e8dab5] text-sm font-medium mb-2">
      <div className="inline-block px-3 py-1 bg-red-700/80 rounded-full">
        <span>{text}</span>
      </div>
    </div>
  );
} 