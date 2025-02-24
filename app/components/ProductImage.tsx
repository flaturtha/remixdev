// components/ProductImage.tsx

const ProductImage: React.FC = () => {
  return (
    <div>
      <img
        src="https://via.placeholder.com/400x600"
        width="400"
        height="600"
        alt="Book Cover"
        className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover"
      />
    </div>
  );
};

export default ProductImage;
