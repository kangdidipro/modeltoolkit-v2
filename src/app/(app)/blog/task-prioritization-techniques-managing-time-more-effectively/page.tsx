
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const prioritizationTechniques = [
  {
    name: "The Eisenhower Matrix",
    description: [
      "The most powerful way to start prioritizing is by understanding the difference between what's urgent and what's important. The Eisenhower Matrix is a 2x2 grid that helps you categorize every task into four quadrants: Do, Schedule, Delegate, or Delete.",
      "This framework forces you to think critically about your to-do list, moving you from a reactive 'fire-fighting' mode to a proactive, strategic approach. It's the best way to ensure you're dedicating time to what truly moves the needle on your long-term goals."
    ],
    href: "/models/eisenhower-matrix"
  },
  {
    name: "The Pareto Principle (80/20 Rule)",
    description: [
      "The Pareto Principle suggests that for many outcomes, roughly 80% of the consequences come from 20% of the causes. In task management, this means a few key tasks (the 'vital few') will deliver the vast majority of your results.",
      "Instead of treating every task as equal, use this model to identify and focus on the high-impact activities. By dedicating your best energy to that critical 20%, you can achieve more with less effort and stop getting bogged down by the 'trivial many'."
    ],
    href: "/models/pareto-principle"
  },
  {
    name: "The MoSCoW Method",
    description: [
        "Commonly used in project management, the MoSCoW method is a great way to prioritize features or tasks by categorizing them into four groups: Must-have, Should-have, Could-have, and Won't-have (this time).",
        "This technique is excellent for team alignment, as it forces clear decisions about what is essential for a project's success and what is a 'nice-to-have.' It brings clarity to scope and helps manage stakeholder expectations effectively."
    ],
  },
  {
    name: "The ABCDE Method",
    description: [
        "A simple yet effective technique for daily planning, the ABCDE method involves assigning a letter to each task on your list. 'A' tasks are the most important (the ones with serious consequences if not done), 'B' tasks are 'should-dos' but with milder consequences, 'C' tasks are 'nice-to-dos,' 'D' tasks are for delegating, and 'E' tasks are for eliminating.",
        "The key rule is that you never do a 'B' task before an 'A' task is complete. This hierarchical approach ensures you are always working on your most valuable tasks first."
    ],
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 30, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Task Prioritization Techniques: Managing Time More Effectively</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stop juggling and start achieving. Learn how to use proven frameworks to focus on what truly matters.
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
                <linearGradient id="grad-prioritize" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-prioritize)" />
              
              <g transform="translate(600, 300) scale(1.1)">
                <path d="M-100,-150 L-100,150" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.2" />
                <path d="M100,-150 L100,150" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.2" />
                
                <rect x="-200" y="-80" width="100" height="160" rx="10" fill="hsl(var(--primary))" opacity="0.1" />
                <rect x="-50" y="-120" width="100" height="240" rx="10" fill="hsl(var(--accent))" opacity="0.1" />
                <rect x="100" y="-50" width="100" height="100" rx="10" fill="hsl(var(--primary))" opacity="0.1" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Master Your Time
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            Feeling busy is not the same as being effective. One of the biggest challenges in modern work is not a lack of time, but a lack of direction. A never-ending to-do list can leave you feeling overwhelmed and unsure of where to start. The secret to escaping this cycle is to master the art of prioritization.
          </p>
          
          <p>
            Effective prioritization is a skill that allows you to consciously direct your time and energy toward the activities that deliver the most value. It's about making strategic choices instead of reacting to the loudest demands. By adopting a structured framework, you can bring order to the chaos and ensure your efforts are aligned with your most important goals.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">Four Powerful Prioritization Techniques</h2>
          <p>
            Here are some of the most effective techniques for bringing clarity to your tasks:
          </p>
          
          <div className="space-y-6 not-prose">
            {prioritizationTechniques.map((technique, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{technique.name}</h3>
                    <div className="text-muted-foreground space-y-4 mt-2">
                        {Array.isArray(technique.description) ? 
                            technique.description.map((p, i) => <p key={i}>{p}</p>) : 
                            <p>{technique.description}</p>
                        }
                    </div>
                     {technique.href && (
                      <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href={technique.href}>
                          Try this model now <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Find Your System</h2>
          <p>
            There is no single "best" method for prioritization. The key is to find a system that works for you and apply it consistently. You might use the <strong>Eisenhower Matrix</strong> for weekly planning and the <strong>ABCDE method</strong> for your daily to-do list. The important thing is to move from a reactive to a proactive mindset, making deliberate choices about how you spend your time.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to reclaim your focus?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start by sorting your tasks with the Eisenhower Matrix to see what truly matters.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/eisenhower-matrix">
                  Go to the Eisenhower Matrix <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 border-t pt-8">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/how-the-eisenhower-matrix-changes-the-way-you-work" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">How the Eisenhower Matrix Changes the Way You Work</h3>
                            <p className="text-muted-foreground mb-4">It's not just a to-do list; it's a mental model that transforms your relationship with time and priorities.</p>
                            <span className="font-semibold text-primary flex items-center">
                                Read more <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </CardContent>
                    </Card>
                </Link>
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
            </div>
        </section>
      </article>
    </div>
  );
}
