export default function LibraryImage() {
  return (
    <section className="w-full py-4">
      <div className="max-w-7xl mx-auto rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop"
          alt="Vintage books on shelves in a library"
          className="w-full h-auto md:object-cover"
          style={{ maxHeight: "500px" }}
        />
      </div>
    </section>
  );
} 