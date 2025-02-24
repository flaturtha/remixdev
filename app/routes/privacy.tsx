import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import Footer from "~/components/Footer";
import ClientOnly from "~/components/ClientOnly";
import ObfuscatedEmail from "~/components/ObfuscatedEmail";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - Tales of Murder" },
    { name: "description", content: "Privacy policy and data handling practices for Tales of Murder." },
  ];
};

export default function PrivacyPolicy() {
  const sections = [
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use-your-information", title: "How We Use Your Information" },
    { id: "contact-us", title: "Contact Us" },
    { id: "your-rights", title: "Your Rights" },
    { id: "updates-to-this-policy", title: "Updates to This Policy" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/">
              <img 
                src="/images/logo_full.svg" 
                alt="Tales of Murder" 
                className="w-full h-auto [filter:invert(1)] max-h-16"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-100 to-gray-200">
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-3xl font-bold text-center text-primary">Privacy Policy</CardTitle>
            <p className="text-center text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <nav className="md:col-span-1">
                <ClientOnly>
                  <ScrollArea className="h-[200px] md:h-[calc(100vh-200px)] pr-4">
                    <ul className="space-y-2">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="text-sm hover:text-primary transition-colors duration-200"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </ClientOnly>
              </nav>
              <div className="md:col-span-3 space-y-6">
                <section id="information-we-collect">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
                  <p className="text-gray-700 mb-2">We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Email address when you subscribe to our newsletter</li>
                    <li>Communication preferences</li>
                  </ul>
                </section>
                <section id="how-we-use-your-information">
                  <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h2>
                  <p className="text-gray-700 mb-2">We use the information we collect to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Send you our newsletter and updates about our products</li>
                    <li>Respond to your requests or questions</li>
                    <li>Improve our services and develop new features</li>
                  </ul>
                </section>
                <section id="contact-us">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about this Privacy Policy, please contact us at:{" "}
                    <ObfuscatedEmail 
                      user="privacy" 
                      domain="talesofmurder.press"
                      className="text-blue-600 hover:underline"
                    />
                  </p>
                </section>
                <section id="your-rights">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
                  <p className="text-gray-700 mb-2">You have the right to:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>
                <section id="updates-to-this-policy">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Updates to This Policy</h2>
                  <p className="text-gray-700">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the
                    new privacy policy on this page and updating the "Last updated" date.
                  </p>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
