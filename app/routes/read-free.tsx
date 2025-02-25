import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Read Free - Tales of Murder" },
    { name: "description", content: "Read free vintage mystery stories at Tales of Murder" },
  ];
};

export default function ReadFree() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">READ FREE</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-700 mb-4">
            Our free reading platform is currently under development.
          </p>
          <p className="text-gray-700">
            Soon, this page will provide access to a selection of free vintage mystery stories that have entered the public domain.
          </p>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Complete public domain mystery stories</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Serialized vintage detective fiction</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Mobile-friendly reading experience</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Regular additions to our free library</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 