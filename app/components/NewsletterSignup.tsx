import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function NewsletterSignup() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 xs:mb-6 text-gray-900">Stay Updated</h2>
          <p className="text-lg xs:text-xl mb-6 xs:mb-8 text-gray-700">
            Join our mailing list for monthly vintage mystery highlights and exclusive subscriber benefits.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email" 
              className="flex-grow bg-white text-gray-900 placeholder:text-gray-500 border-gray-300"
            />
            <Button 
              type="submit" 
              className="whitespace-nowrap bg-[#8b0000] text-white hover:bg-[#6d0000] font-medium"
            >
              Help Preserve Vintage Mysteries
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-500">No spam, just monthly vintage mystery highlights. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
} 