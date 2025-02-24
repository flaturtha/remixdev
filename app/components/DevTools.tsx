// Only use during development
export default function DevTools() {
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-0 left-0 z-50 p-2 bg-black text-white text-xs">
      <div className="block xs:hidden">xs</div>
      <div className="hidden xs:block sm:hidden">sm</div>
      <div className="hidden sm:block md:hidden">md</div>
      <div className="hidden md:block lg:hidden">lg</div>
      <div className="hidden lg:block xl:hidden">xl</div>
      <div className="hidden xl:block 2xl:hidden">2xl</div>
      <div className="hidden 2xl:block">3xl+</div>
    </div>
  );
} 