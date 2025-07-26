
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const timeManagementStrategies = [
  {
    name: "Prioritize Ruthlessly with the Eisenhower Matrix",
    description: [
      "The foundation of all effective time management is prioritization. The Eisenhower Matrix is an indispensable tool that helps you distinguish between what is urgent and what is important. By sorting tasks into four quadrants (Do, Schedule, Delegate, Delete), you can cut through the noise and focus on what truly drives progress.",
      "This model prevents you from falling into the 'busyness trap' where you are constantly reacting to urgent but unimportant demands. Instead, it empowers you to proactively allocate time to strategic, long-term goals."
    ],
    href: "/models/eisenhower-matrix"
  },
  {
    name: "Leverage Your Efforts with the Pareto Principle",
    description: [
      "The 80/20 Rule, or Pareto Principle, states that roughly 80% of outcomes come from 20% of causes. In time management, this means identifying the 'vital few' activities that generate the most significant results and dedicating your best energy to them.",
      "Instead of treating all tasks as having equal weight, use this model to analyze your workload and identify high-leverage activities. This ensures you're not just busy, but productive and impactful."
    ],
    href: "/models/pareto-principle"
  },
  {
    name: "Structure Your Day with Time Blocking",
    description: [
        "Time blocking is the practice of scheduling out every part of your day. Instead of working from a to-do list, you assign specific 'blocks' of time on your calendar for each task. This creates a concrete plan and protects your time from interruptions.",
        "This technique is incredibly effective for ensuring you make time for 'deep work'—cognitively demanding tasks that require intense focus. By scheduling these blocks, you are making a commitment to your most important work."
    ],
  },
  {
    name: "Focus in Sprints with the Pomodoro Technique",
    description: [
        "The Pomodoro Technique is a method that uses a timer to break down work into focused intervals, traditionally 25 minutes in length, separated by short breaks. This approach helps maintain high levels of concentration and prevents mental fatigue.",
        "It's a simple yet powerful way to overcome procrastination and improve focus. Each 'Pomodoro' is a focused sprint on a single task, making large projects feel less daunting and more manageable."
    ],
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 31, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Time Management Strategies for Busy Professionals</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Take control of your schedule and focus your energy with these proven time management frameworks.
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
                <linearGradient id="grad-time" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-time)" />
              
              <g transform="translate(600, 300) scale(1.2)">
                <circle cx="0" cy="0" r="150" fill="hsl(var(--foreground))" opacity="0.02" />
                <circle cx="0" cy="0" r="120" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="10 5" />
                <path d="M 0 -100 L 0 -20" stroke="hsl(var(--accent))" strokeWidth="4" />
                <path d="M 0 0 L 70 0" stroke="hsl(var(--accent))" strokeWidth="4" />
                <circle cx="0" cy="0" r="10" fill="hsl(var(--background))" stroke="hsl(var(--accent))" strokeWidth="4" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Own Your Time
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            In the modern workplace, time is our most precious and finite resource. Yet, for many busy professionals, the day feels like a constant battle against a flood of emails, meetings, and unexpected demands. The feeling of being perpetually behind is common, but it's not inevitable. Effective time management isn't about finding more hours in the day; it's about making deliberate choices with the hours you have.
          </p>
          
          <p>
            The key is to move from a reactive to a proactive approach. Instead of letting your inbox dictate your priorities, you need a system to help you focus your energy on what truly matters. Strategic frameworks and proven techniques can provide the structure you need to take control of your schedule, reduce stress, and achieve your most important goals.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">Four Essential Time Management Strategies</h2>
          <p>
            Here are some of the most effective strategies for managing your time and boosting your productivity:
          </p>
          
          <div className="space-y-6 not-prose">
            {timeManagementStrategies.map((technique, index) => (
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
                          Apply this model now <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Build Your Personal System</h2>
          <p>
            The most effective time management system is one you build yourself by combining these techniques. Use the <strong>Eisenhower Matrix</strong> for your weekly planning to set priorities. Then, use <strong>Time Blocking</strong> to schedule your most important tasks. When it's time to execute, use the <strong>Pomodoro Technique</strong> to maintain focus. This multi-layered approach provides both high-level strategy and in-the-moment execution tactics.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to take control of your calendar?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start by prioritizing your tasks with the Eisenhower Matrix to gain immediate clarity.
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
                <Link href="/blog/task-prioritization-techniques-managing-time-more-effectively" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">Task Prioritization Techniques: Managing Time More Effectively</h3>
                            <p className="text-muted-foreground mb-4">Stop juggling and start achieving. Learn how to use proven frameworks to focus on what truly matters.</p>
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
