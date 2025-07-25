import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const freeTools = [
  {
    name: "SWOT Analysis",
    description: [
      "A cornerstone of strategic planning, the SWOT analysis helps you identify your Strengths, Weaknesses, Opportunities, and Threats. Our interactive canvas makes it easy to map out these factors, providing a clear foundation for any business or personal project.",
      "This tool is invaluable for everything from validating a new business idea to assessing your career path. Best of all, it's completely free to use, giving you access to high-level strategic insights without any cost."
    ],
    href: "/models/swot"
  },
  {
    name: "Business Model Canvas",
    description: [
      "The Business Model Canvas is a one-page blueprint for your entire business. It allows you to visualize, design, and test your business model, covering everything from your value proposition and customer segments to revenue streams and cost structure.",
      "Instead of a lengthy business plan, you can quickly sketch and iterate on your ideas. It's an essential free tool for startups and established companies looking to innovate and adapt."
    ],
    href: "/models/business-model-canvas"
  },
  {
    name: "Eisenhower Matrix",
    description: [
        "Boost your personal and professional productivity with this simple yet powerful time management tool. The Eisenhower Matrix helps you prioritize tasks by categorizing them based on urgency and importance, allowing you to focus on what truly matters.",
        "By sorting your to-do list into 'Do,' 'Schedule,' 'Delegate,' and 'Delete,' you can cut through the clutter and make significant progress on your long-term goals. It's a free, life-changing tool for anyone feeling overwhelmed."
    ],
    href: "/models/eisenhower-matrix"
  },
  {
    name: "Gantt Chart",
    description: [
        "Visualize your project timeline and manage tasks with a free, interactive Gantt Chart. This tool is essential for project planning, helping you track dependencies, allocate resources, and monitor progress against your deadlines.",
        "Whether you're managing a complex project or a simple personal goal, a Gantt Chart provides the clarity needed to keep everything on schedule. Our tool makes it easy to create and update your timeline as things change."
    ],
    href: "/models/gantt-chart"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 26, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Best Free Tools for Business Planning and Productivity</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            You don't need a big budget to access powerful strategic frameworks. Here are the best free tools to get you started.
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
                <linearGradient id="grad-free-tools" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
                <filter id="glow-free-tools" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-free-tools)" />

              <g transform="translate(600, 300)">
                <path d="M-100 -50 L100 -50 L120 0 L100 50 L-100 50 L-120 0 Z" fill="hsl(var(--primary))" opacity="0.1" filter="url(#glow-free-tools)" />
                 <circle cx="0" cy="0" r="40" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" opacity="0.4" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Powerful & Free
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            Strategic planning and productivity enhancement shouldn't be locked behind expensive software subscriptions. The most powerful ideas are often built on simple, accessible frameworks. At Model Toolkit, we believe in democratizing these tools, providing everyone with free access to the models that drive success in business and personal life.
          </p>
          
          <p>
            Whether you're a bootstrapping startup, a student on a budget, or a professional looking to sharpen your skills, having the right tools at your fingertips is a game-changer. This article highlights some of the best free tools available in our toolkit to help you plan, prioritize, and execute with clarity and confidence.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">Your Free Toolkit for Success</h2>
          <p>
            Here are some essential—and completely free—models you can start using right now:
          </p>
          
          <div className="space-y-6 not-prose">
            {freeTools.map((tool, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{tool.name}</h3>
                    <div className="text-muted-foreground space-y-4 mt-2">
                        {Array.isArray(tool.description) ? 
                            tool.description.map((p, i) => <p key={i}>{p}</p>) : 
                            <p>{tool.description}</p>
                        }
                    </div>
                     {tool.href && (
                      <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href={tool.href}>
                          Use this free tool <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">No Cost, All Value</h2>
          <p>
            The true value of these models isn't in their price tag, but in the clarity they bring to your thinking. By using these free tools, you can build a robust business strategy, optimize your workflow, and make better-informed decisions without spending a dime. Start exploring our toolkit today and unlock your full potential.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Explore our complete suite of free, interactive models and start planning smarter today.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models">
                  Explore All Models <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 border-t pt-8">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/10-best-productivity-tools" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">10 Strategic Models to Boost Your Productivity</h3>
                            <p className="text-muted-foreground mb-4">Discover the mental frameworks in Model Toolkit that help you think smarter, not just work harder.</p>
                            <span className="font-semibold text-primary flex items-center">
                                Read more <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </CardContent>
                    </Card>
                </Link>
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
            </div>
        </section>

      </article>
    </div>
  );
}
