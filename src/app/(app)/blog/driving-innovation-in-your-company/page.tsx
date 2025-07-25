import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const innovationFrameworks = [
  {
    name: "SCAMPER Model",
    description: [
      "The SCAMPER model is a creative brainstorming technique that helps you generate new ideas by asking seven types of questions about an existing product, service, or problem. It's a powerful way to challenge your assumptions and explore new possibilities from different angles.",
      "By prompting you to Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse, SCAMPER provides a structured framework for innovation. It's an excellent tool for product development teams looking to iterate and improve on existing ideas."
    ],
    href: "/models/scamper-model"
  },
  {
    name: "Diffusion of Innovations",
    description: [
      "This theory explains how, why, and at what rate new ideas and technologies spread through cultures. Understanding this model is crucial for any company looking to launch an innovative product, as it helps you identify the different adopter categories, from Innovators to Laggards.",
      "By analyzing the characteristics of your innovation and the social system it's entering, you can tailor your marketing and communication strategies to accelerate adoption. It helps you understand the journey from a niche idea to mainstream acceptance."
    ],
    href: "/models/diffusion-of-innovations"
  },
  {
    name: "Business Model Canvas",
    description: [
        "Innovation isn't just about new products; it's also about new business models. The Business Model Canvas allows you to quickly sketch out and test innovative ways to create, deliver, and capture value.",
        "You can use it to explore different revenue streams, customer segments, or channel strategies, making it an indispensable tool for business model innovation. It helps you see the big picture and how different parts of your business work together to support a new idea."
    ],
    href: "/models/business-model-canvas"
  },
  {
    name: "Fishbone Diagram",
    description: [
        "Innovation often starts with solving a problem. The Fishbone Diagram (or Cause-and-Effect Diagram) is a tool for identifying the root causes of an issue, which can, in turn, spark innovative solutions.",
        "Instead of just treating symptoms, this diagram forces you to think systematically about all potential causes related to people, processes, equipment, and more. This deep analysis is often the starting point for process innovation and quality improvement."
    ],
    href: "/models/fishbone-diagram"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 20, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Driving Innovation in Your Company: Frameworks and Ideas</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Move beyond brainstorming and use structured models to build a culture of innovation.
          </p>
        </header>

        <Card className="overflow-hidden">
          <CardContent className="p-0 bg-primary/5">
             <svg
              viewBox="0 0 1200 600"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient id="grad-innovation" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
                <filter id="glow-innovation" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-innovation)" />

              {/* Abstract shapes representing ideas and connections */}
              <circle cx="600" cy="300" r="150" fill="hsl(var(--primary))" opacity="0.05" filter="url(#glow-innovation)" />
              <path d="M 450 300 C 400 200, 800 200, 750 300" stroke="hsl(var(--primary))" fill="none" strokeWidth="3" opacity="0.4" />
              <path d="M 480 300 C 450 400, 750 400, 720 300" stroke="hsl(var(--accent))" fill="none" strokeWidth="3" opacity="0.4" />

              <g transform="translate(600, 300)">
                <path d="M 0 0 L 50 20 L 20 50 L -20 50 L -50 20 Z" fill="hsl(var(--accent))" opacity="0.2"/>
                 <circle cx="0" cy="-30" r="10" fill="hsl(var(--primary))" opacity="0.5" />
              </g>

              <g transform="translate(300, 150) rotate(-25)">
                <rect x="-30" y="-30" width="60" height="60" rx="10" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" opacity="0.5" />
              </g>
              <g transform="translate(900, 450) rotate(35)">
                 <rect x="-40" y="-40" width="80" height="80" rx="40" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.5" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Spark New Ideas
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            Innovation is the lifeblood of any growing company, but it's often treated as a mysterious force that strikes like lightning. The truth is, innovation can be a systematic and repeatable process. By using the right frameworks, you can move beyond unstructured brainstorming and build a reliable engine for generating, evaluating, and implementing new ideas.
          </p>
          
          <p>
            The key is to give your team the tools they need to think differently. Strategic models provide a new lens through which to view old problems, challenging assumptions and revealing hidden opportunities. Whether you're trying to improve an existing product or invent something entirely new, these frameworks can guide your creative process and increase your chances of success.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">Frameworks for Fostering Innovation</h2>
          <p>
            Here are some of the most effective models for sparking and managing innovation in your organization:
          </p>
          
          <div className="space-y-6 not-prose">
            {innovationFrameworks.map((framework, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{framework.name}</h3>
                    <div className="text-muted-foreground space-y-4 mt-2">
                        {Array.isArray(framework.description) ? 
                            framework.description.map((p, i) => <p key={i}>{p}</p>) : 
                            <p>{framework.description}</p>
                        }
                    </div>
                     {framework.href && (
                      <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href={framework.href}>
                          Use this framework <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Innovation as a Process, Not an Accident</h2>
          <p>
            Building a culture of innovation requires more than just encouraging people to "think outside the box." It requires providing the "box" itself—a structured process for creativity. By integrating tools like <strong>SCAMPER</strong> for idea generation and the <strong>Diffusion of Innovations</strong> model for market strategy, you create a repeatable system that can turn creative sparks into tangible business value.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to build your innovation engine?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start with a creative framework like SCAMPER to challenge your assumptions and generate new ideas.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/scamper-model">
                  Go to SCAMPER Model <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 border-t pt-8">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/understanding-various-business-models-for-startup-growth" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">Understanding Various Business Models for Startup Growth</h3>
                            <p className="text-muted-foreground mb-4">Choosing the right framework is the first step to building a sustainable and scalable company.</p>
                            <span className="font-semibold text-primary flex items-center">
                                Read more <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/blog/formulating-a-strong-business-strategy-step-by-step" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">Formulating a Strong Business Strategy: Step-by-Step</h3>
                            <p className="text-muted-foreground mb-4">A clear roadmap is the foundation of any successful venture. Here’s how to build one.</p>
                             <span className="font-semibold text-primary flex items-center">
                                Read more <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </section>

      </article>
    </div>
  );
}
