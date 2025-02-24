import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import Footer from "~/components/Footer";
import ClientOnly from "~/components/ClientOnly";
import ObfuscatedEmail from "~/components/ObfuscatedEmail";

export const meta: MetaFunction = () => {
  return [
    { title: "Terms of Service - Tales of Murder" },
    { name: "description", content: "Terms of service and conditions for Tales of Murder." },
  ];
};

export default function Terms() {
  const sections = [
    { id: "agreement", title: "1. Agreement to Terms" },
    { id: "license", title: "2. Use License" },
    { id: "disclaimer", title: "3. Disclaimer" },
    { id: "limitations", title: "4. Limitations" },
    { id: "contact", title: "5. Contact Information" },
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
            <CardTitle className="text-3xl font-bold text-center text-primary">Terms of Service</CardTitle>
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
                <section id="agreement">
                  <h2 className="text-2xl font-semibold text-primary mb-4">1. Agreement to Terms</h2>
                  <p className="text-gray-700">
                    By accessing our website at talesofmurder.press, you agree to be bound by these terms of
                    service and agree that you are responsible for compliance with any applicable local laws.
                  </p>
                </section>

                <section id="license">
                  <h2 className="text-2xl font-semibold text-primary mb-4">2. Use License</h2>
                  <p className="text-gray-700 mb-4">
                    Permission is granted to temporarily access the materials (information or software) on
                    Tales of Murder&apos;s website for personal, non-commercial transitory viewing only.
                  </p>
                  <p className="text-gray-700">
                    This license shall automatically terminate if you violate any of these restrictions and may be 
                    terminated by Tales of Murder at any time.
                  </p>
                </section>

                <section id="disclaimer">
                  <h2 className="text-2xl font-semibold text-primary mb-4">3. Disclaimer</h2>
                  <p className="text-gray-700">
                    The materials on Tales of Murder&apos;s website are provided on an &apos;as is&apos; basis.
                    Tales of Murder makes no warranties, expressed or implied, and hereby disclaims and negates
                    all other warranties including, without limitation, implied warranties or conditions of
                    merchantability, fitness for a particular purpose, or non-infringement of intellectual property
                    or other violation of rights.
                  </p>
                </section>

                <section id="limitations">
                  <h2 className="text-2xl font-semibold text-primary mb-4">4. Limitations</h2>
                  <p className="text-gray-700">
                    In no event shall Tales of Murder or its suppliers be liable for any damages (including,
                    without limitation, damages for loss of data or profit, or due to business interruption)
                    arising out of the use or inability to use the materials on Tales of Murder&apos;s website.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-semibold text-primary mb-4">5. Contact Information</h2>
                  <p className="text-gray-700">
                    If you have any questions about these Terms of Service, please contact us at:{' '}
                    <ObfuscatedEmail 
                      user="terms" 
                      domain="talesofmurder.press"
                      className="text-blue-600 hover:underline"
                    />
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
