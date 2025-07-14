import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "A Rich Library of Models",
    description: "Explore a wide range of established business and productivity models, including SWOT, Eisenhower Matrix, Business Model Canvas, and more."
  },
  {
    title: "Interactive Canvases",
    description: "Each model comes with an interactive canvas that allows you to add, edit, delete, and drag-and-drop items, bringing your ideas to life."
  },
  {
    title: "Seamless Data Management",
    description: "Your work is automatically saved in your browser. You can access version history and import or export your data in XML format for portability."
  },
  {
    title: "Versatile Export Options",
    description: "Export your completed models to various formats like PDF and PNG, perfect for presentations, reports, or sharing with your team."
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-headline">About Model Toolkit</h1>
        <p className="text-xl text-muted-foreground">Your strategic partner in structured thinking.</p>
        <p className="max-w-3xl mx-auto text-muted-foreground pt-4">
          Model Toolkit was born from a simple idea: to provide a comprehensive and accessible suite of business and productivity models that empower users to bring clarity to complex challenges. Whether you're a seasoned professional, a student, or an aspiring entrepreneur, our toolkit is designed to help you strategize, innovate, and execute with confidence.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">Our Mission</h2>
        <p className="text-center max-w-3xl mx-auto text-muted-foreground">
          Our mission is to democratize access to powerful strategic thinking tools. We believe that everyone should have the ability to apply structured models to their personal and professional challenges. We are committed to making these frameworks not just available, but also intuitive, practical, and a pleasure to use.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">What We Offer</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">Meet the Creator</h2>
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-secondary/30 flex items-center justify-center p-8">
              <svg
                className="w-48 h-48 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                <path d="M11.5 16.5L10 22h4l-1.5-5.5-0.5-1.5-0.5 1.5z" />
              </svg>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
              <p className="text-muted-foreground">
                As a lifelong learner and problem-solver, I've always been fascinated by the power of mental models to simplify complex problems. I created Model Toolkit to be the application I always wished I had—a single place to access, interact with, and save my strategic thinking exercises. My goal is to empower others to think more clearly and make better decisions. I hope you find it as useful as I do!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
