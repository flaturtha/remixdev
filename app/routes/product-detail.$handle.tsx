import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { useState } from 'react';
import { Home, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Container } from '~/components/common/container';
import { Breadcrumbs } from '~/components/common/Breadcrumbs';
import { Button } from '~/components/ui/button';
import { generateDummyProducts } from '~/lib/dummy-data';
import { AnimatedProductImage } from "~/components/product/AnimatedProductImage";
import { ProductImageGallery } from "~/components/product/ProductImageGallery";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("Product detail loader called with params:", params);
  
  const handle = params.handle;
  
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
        description: `This is a detailed description for product ${handle}. It includes all the features and benefits that make this product special.`,
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

  // In the loader function, check if there's a collection context:
  const collectionHandle = params.searchParams.get('collection');
  let collectionData = null;

  if (collectionHandle) {
    // Fetch the collection data (using dummy data for now)
    const collections = [
      { id: 'col_1', title: 'New Arrivals', handle: 'new-arrivals' },
      { id: 'col_2', title: 'Best Sellers', handle: 'best-sellers' },
      { id: 'col_3', title: 'Sale', handle: 'sale' },
      { id: 'vintage_crime', title: 'Vintage Crime', handle: 'vintage-crime' },
      { id: 'bradys', title: 'Brady\'s Secret Service', handle: 'bradys-secret-service' }
    ];
    
    collectionData = collections.find(c => c.handle === collectionHandle);
  }

  // Add to the loader function:
  const categoryHandle = params.searchParams.get('category');
  let categoryData = null;

  if (categoryHandle) {
    // Fetch the category data (using dummy data for now)
    const categories = [
      { id: 'cat_1', name: 'Mystery', handle: 'mystery' },
      { id: 'cat_2', name: 'Crime', handle: 'crime' },
      { id: 'cat_3', name: 'Detective', handle: 'detective' }
    ];
    
    categoryData = categories.find(c => c.handle === categoryHandle);
  }

  // Return the collection data with the loader data
  return json({
    product,
    relatedProducts,
    collectionData,
    categoryData
  });
};

export default function ProductDetailPage() {
  const { product, relatedProducts, collectionData, categoryData } = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    opt_size: "Medium",
    opt_color: "Blue"
  });

  // Determine breadcrumb items based on context
  let breadcrumbItems = [];

  if (collectionData) {
    breadcrumbItems = [
      { label: 'Collections', href: '/collections' },
      { label: collectionData.title, href: `/collections/${collectionData.handle}` },
      { label: product.title }
    ];
  } else if (categoryData) {
    breadcrumbItems = [
      { label: 'Categories', href: '/categories' },
      { label: categoryData.name, href: `/categories/${categoryData.handle}` },
      { label: product.title }
    ];
  } else {
    breadcrumbItems = [
      { label: 'Books', href: '/products' },
      { label: product.title }
    ];
  }

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
    <Container className="pb-16">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductImageGallery product={product} />

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
              to={`/product-detail/${relatedProduct.handle}`}
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