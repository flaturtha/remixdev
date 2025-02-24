export default function SocialProof({ count }: { count: number }) {
  return (
    <div className="mb-4 text-[#e8dab5] text-sm font-medium">
      <div className="flex items-center justify-center gap-2">
        <span>🔥</span>
        <span>Join {count.toLocaleString()}+ mystery lovers</span>
      </div>
    </div>
  );
} 