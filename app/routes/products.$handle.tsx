import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { useState, useMemo } from 'react';
import { Home, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Container } from '~/components/common/container';
import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Button } from '~/components/ui/button';
import { generateDummyProducts } from '~/lib/dummy-data';
import { Product } from '~/lib/types';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // TODO: Replace with actual API call to Medusa when ready
  const handle = params.handle;
  
  console.log("Looking for product with handle:", handle); // Debug log
  
  // Generate all dummy products
  const dummyProducts = generateDummyProducts(20);
  
  // Try to find the product by handle
  const product = dummyProducts.find(p => p.handle === handle);
  
  if (!product) {
    // If product not found, create a fallback product
    return json({
      product: {
        id: `prod_${handle}`,
        title: `Product ${handle}`,
        description: `This is a detailed description for product ${handle}...`,
        thumbnail: `https://placehold.co/600x800?text=Product+${handle}`,
        price: {
          amount: Math.floor(Math.random() * 10000) / 100,
          currency_code: "USD",
        },
        handle: handle,
        images: [
          `https://placehold.co/600x800?text=Product+${handle}+Image+1`,
          `https://placehold.co/600x800?text=Product+${handle}+Image+2`,
          `https://placehold.co/600x800?text=Product+${handle}+Image+3`,
        ],
        options: [
          {
            id: "opt_size",
            title: "Size",
            values: ["Small", "Medium", "Large"]
          },
          {
            id: "opt_color",
            title: "Color",
            values: ["Red", "Blue", "Green", "Black"]
          }
        ],
        variants: [
          {
            id: "var_1",
            title: "Small / Red",
            prices: [{ amount: 1999, currency_code: "USD" }]
          },
          {
            id: "var_2",
            title: "Medium / Blue",
            prices: [{ amount: 2499, currency_code: "USD" }]
          }
        ]
      },
      relatedProducts: dummyProducts.slice(0, 4)
    });
  }
  
  // Get related products
  const relatedProducts = dummyProducts.filter(p => p.id !== product.id).slice(0, 4);
  
  return json({ product, relatedProducts });
};

export default function ProductDetailPage() {
  const { product, relatedProducts } = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    opt_size: "Medium",
    opt_color: "Blue"
  });

  // Breadcrumbs for navigation
  const breadcrumbs = [
    {
      label: (
        <span className="flex whitespace-nowrap">
          <Home className="inline h-4 w-4" />
          <span className="sr-only">Home</span>
        </span>
      ),
      url: '/',
    },
    {
      label: 'Products',
      url: '/products',
    },
    {
      label: product.title,
    },
  ];

  // Handle option change
  const handleOptionChange = (optionId: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: value
    }));
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.price.currency_code,
  }).format(product.price.amount);

  return (
    <Container className="py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md ${
                    selectedImage === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-2xl font-medium text-gray-900">
              {formattedPrice}
            </p>
          </div>

          {/* Product Description */}
          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-700">{product.description}</p>
          </div>

          {/* Product Options */}
          {product.options && product.options.length > 0 && (
            <div className="mt-8 space-y-6">
              {product.options.map((option) => (
                <div key={option.id} className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">{option.title}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleOptionChange(option.id, value)}
                        className={`border rounded-md py-2 px-3 text-sm ${
                          selectedOptions[option.id] === value
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center mt-2 space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-md border border-gray-300 p-2"
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-md border border-gray-300 p-2"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8 flex space-x-4">
            <Button className="flex-1 py-6">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="p-6">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="p-6">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          You may also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.id}
              to={`/products/${relatedProduct.handle}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={relatedProduct.thumbnail}
                  alt={relatedProduct.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{relatedProduct.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: relatedProduct.price.currency_code,
                }).format(relatedProduct.price.amount)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
} 