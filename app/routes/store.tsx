import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Store - Tales of Murder" },
    { name: "description", content: "Shop vintage mystery books at Tales of Murder" },
  ];
};

export default function Store() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">STORE</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-700 mb-4">
            Our full e-commerce store is currently under development using Medusa.js.
          </p>
          <p className="text-gray-700">
            In the future, this page will redirect to store.talesofmurder.com where you'll be able to browse and purchase our entire collection of vintage mystery books.
          </p>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Carefully restored vintage mystery books</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Multiple formats including paperback, large print, and ebooks</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Curated collections from different eras and authors</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Subscription options for regular deliveries</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 