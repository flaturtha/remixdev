import { useState } from 'react'
import { Link, useActionData, Form, useNavigation, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Label } from "~/components/ui/label"
import { Card, CardContent } from "~/components/ui/card"
import Footer from "~/components/Footer";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import ObfuscatedEmail from "~/components/ObfuscatedEmail";

export const loader: LoaderFunction = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return json({
    mathProblem: {
      num1,
      num2,
      answer: num1 + num2
    }
  });
};

export default function ContactPage() {
  const { mathProblem } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xkgnragj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmittedMessage({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          message: formData.get('message') as string,
        });
        setSubmitted(true);
        form.reset();
      } else {
        setSubmissionError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmissionError("Failed to send message. Please try again.");
    }
  };

  if (submitted) {
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
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="p-12">
                <h1 className="text-3xl font-bold mb-4 text-center">CrowMail Received!</h1>
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-700 mb-4">You said:</p>
                  <div className="pl-4 border-l-2 border-gray-200">
                    <p className="text-gray-600 whitespace-pre-wrap">{submittedMessage.message}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-center">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <div className="text-center">
                  <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Send Us A Crow&middot;Mail</h1>
          <p className="text-center text-gray-600 mb-8">
            We'd love to hear from you. Please fill out the form below or use our contact information.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input 
                    type="hidden" 
                    name="_replyto" 
                    value="atticus@crowmail.co"
                  />
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="math">What is {mathProblem.num1} + {mathProblem.num2}?</Label>
                    <Input
                      id="math"
                      name="math"
                      required
                    />
                    <input 
                      type="hidden" 
                      name="expectedAnswer" 
                      value={mathProblem.answer} 
                    />
                  </div>
                  <Input
                    type="text"
                    name="_gotcha"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {submissionError && (
                    <div className="text-red-500 text-sm">
                      {submissionError}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span>📧</span>
                    <ObfuscatedEmail 
                      user="atticus" 
                      domain="crowmail.co"
                      className="hover:underline"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span>📍</span>
                    <span>675 Town Square Blvd, Building 1A, Suite 200, PMG 530, Garland, TX 75040</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Response Time</h3>
                  <p className="text-gray-600">We typically respond within 1-2 business days.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 