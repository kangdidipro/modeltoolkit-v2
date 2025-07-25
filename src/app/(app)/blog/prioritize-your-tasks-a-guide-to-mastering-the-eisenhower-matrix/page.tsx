
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const eisenhowerSteps = [
  {
    name: "1. Identify Urgent & Important (Do First)",
    description: [
      "This is Quadrant 1, for tasks that are both critical and time-sensitive. These are your top priorities that require immediate attention, such as crises, pressing deadlines, and significant problems.",
      "The goal is to handle these tasks immediately to prevent them from escalating. A well-managed workflow should aim to minimize the number of tasks that fall into this quadrant by planning ahead."
    ],
    href: "/models/eisenhower-matrix"
  },
  {
    name: "2. Identify Important & Not Urgent (Schedule)",
    description: [
      "This is Quadrant 2, the heart of effective personal management. These tasks are crucial for your long-term goals but don't have an immediate deadline. This includes strategic planning, relationship-building, and personal development.",
      "This is where you should proactively spend most of your time. By scheduling these activities, you prevent them from becoming urgent crises later on. It's the quadrant of quality, planning, and prevention."
    ],
    href: "/models/eisenhower-matrix"
  },
  {
    name: "3. Identify Urgent & Not Important (Delegate)",
    description: [
        "This is Quadrant 3, the quadrant of deception. These tasks are urgent, demanding your attention now, but they don't contribute to your long-term goals. This often includes interruptions, some meetings, and other people's minor issues.",
        "The key here is to delegate these tasks whenever possible. If you can't delegate, try to handle them quickly and efficiently without letting them derail your focus on Quadrant 2 activities. Learning to say 'no' is a crucial skill for managing this quadrant."
    ],
    href: "/models/eisenhower-matrix"
  },
  {
    name: "4. Identify Not Urgent & Not Important (Delete)",
    description: [
        "This is Quadrant 4, the quadrant of waste. These tasks are distractions and have no real value. This includes time-wasting activities, trivial matters, and unnecessary interruptions.",
        "The strategy for this quadrant is simple: eliminate these tasks. Be ruthless in identifying and cutting out activities that don't serve your goals. Reclaiming this time is a quick way to boost your overall productivity."
    ],
    href: "/models/eisenhower-matrix"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 28, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Prioritize Your Tasks: A Guide to Mastering the Eisenhower Matrix</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stop being busy and start being productive. Learn how to use this simple 2x2 grid to focus on what truly matters.
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
                <linearGradient id="grad-eisenhower" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-eisenhower)" />

              <g transform="translate(600, 300) scale(1.2)">
                <path d="M -150 -150 H 150 V 150 H -150 Z" fill="hsl(var(--foreground))" opacity="0.02" />
                <line x1="-150" y1="0" x2="150" y2="0" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
                <line x1="0" y1="-150" x2="0" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
                
                <rect x="-100" y="-100" width="80" height="80" fill="hsl(var(--accent))" opacity="0.2" />
                <rect x="20" y="-100" width="80" height="80" fill="hsl(var(--primary))" opacity="0.2" />
                <rect x="-100" y="20" width="80" height="80" fill="hsl(var(--primary))" opacity="0.2" />
                <rect x="20" y="20" width="80" height="80" fill="hsl(var(--accent))" opacity="0.2" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Focus on What Matters
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            In our always-on world, the flow of tasks is endless. It's easy to feel busy all day, yet end the week wondering what you actually accomplished. The problem isn't a lack of effort, but a lack of focus. The Eisenhower Matrix, named after the 34th U.S. President Dwight D. Eisenhower, is a simple yet powerful tool designed to solve this exact problem. It helps you distinguish between what is urgent and what is important, so you can focus on what truly drives results.
          </p>
          
          <p>
            The matrix works by dividing your tasks into a four-quadrant grid based on two criteria: urgency and importance. This framework provides immediate clarity, turning a chaotic to-do list into an actionable plan. By understanding where each task fits, you can move from a reactive state of fighting fires to a proactive state of strategic execution.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">The Four Quadrants of Productivity</h2>
          <p>
            Here's how to break down your tasks using the Eisenhower Matrix:
          </p>
          
          <div className="space-y-6 not-prose">
            {eisenhowerSteps.map((step, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{step.name}</h3>
                    <div className="text-muted-foreground space-y-4 mt-2">
                        {Array.isArray(step.description) ? 
                            step.description.map((p, i) => <p key={i}>{p}</p>) : 
                            <p>{step.description}</p>
                        }
                    </div>
                     {step.href && (
                      <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href={step.href}>
                          Try this model now <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Mastering the Matrix</h2>
          <p>
            The key to mastering the Eisenhower Matrix is making it a regular habit. Start your day or week by plotting your tasks on the grid. Over time, you'll find yourself naturally spending more time in Quadrant 2, which is the key to long-term success and reduced stress. It's not just about managing time; it's about managing your energy and attention.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to take control of your to-do list?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start categorizing your tasks with our free, interactive Eisenhower Matrix.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/eisenhower-matrix">
                  Go to Eisenhower Matrix <ArrowRight className="ml-2 h-5 w-5" />
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
                <Link href="/blog/from-idea-to-action-keys-to-successful-business-plan-execution" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">From Idea to Action: Keys to Successful Business Plan Execution</h3>
                            <p className="text-muted-foreground mb-4">A brilliant strategy is worthless without execution. Here’s how to close the gap between planning and doing.</p>
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
