import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const executionSteps = [
  {
    name: "1. Define Clear, Actionable Goals",
    description: [
      "The first step in execution is knowing exactly what you're trying to achieve. Vague objectives lead to vague results. Your goals must be specific, measurable, achievable, relevant, and time-bound (SMART). This clarity provides a destination for your team and a benchmark for success.",
      "Instead of 'Increase sales,' a better goal is 'Increase online sales by 15% in the next quarter.' This provides a clear target that everyone can understand and work towards. This level of specificity is the foundation of any successful execution plan."
    ],
  },
  {
    name: "2. Create a Detailed Action Plan",
    description: [
      "With your goals defined, you need to break them down into a concrete set of tasks and initiatives. This is where your high-level strategy gets translated into a day-to-day work plan. Identify every step required to reach your objectives and assign a timeline to each.",
      "A Gantt Chart is an indispensable tool for this stage. It allows you to visualize your project timeline, map out dependencies between tasks, and track progress against your schedule. This creates a clear roadmap for your team to follow, ensuring that everyone knows what needs to be done and when."
    ],
    href: "/models/gantt-chart"
  },
  {
    name: "3. Assign Roles and Responsibilities",
    description: [
        "A great plan can fail if there's confusion about who is responsible for what. Every task in your action plan must have a clear owner. This eliminates ambiguity and fosters a culture of accountability, where everyone understands their specific contribution to the overall goal.",
        "The RACI Matrix is the perfect framework for this. It clarifies who is Responsible (does the work), Accountable (owns the work), Consulted (provides input), and Informed (is kept up-to-date) for every single task. This ensures that nothing falls through the cracks and that decision-making is streamlined."
    ],
    href: "/models/raci-matrix"
  },
  {
    name: "4. Monitor Progress and Establish KPIs",
    description: [
        "Execution is not a 'set it and forget it' activity. You need to continuously monitor your progress against your goals. Establish Key Performance Indicators (KPIs) that will tell you if you're on track. Regular check-ins and progress reviews are essential to catch problems early and make necessary adjustments.",
        "Your KPIs should be directly linked to your SMART goals. For example, if your goal is to increase sales, your KPIs might include website traffic, conversion rate, and average order value. Tracking these metrics gives you the data you need to make informed decisions and steer your execution in the right direction."
    ],
  },
    {
    name: "5. Foster a Culture of Communication and Adaptability",
    description: [
        "No plan is perfect, and you will inevitably encounter unexpected challenges and opportunities. A successful execution plan requires open and transparent communication, where team members feel comfortable raising issues and suggesting improvements. It also requires the flexibility to adapt your plan as you learn more and as market conditions change.",
        "Encourage regular feedback and create a culture where it's safe to learn from mistakes. An adaptable team that communicates well is far more likely to successfully navigate the complexities of execution than a rigid team that operates in silos. This is where team development models like Tuckman's Stages can be helpful to understand your team's dynamics."
    ],
    href: "/models/tuckmans-stages"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">From Idea to Action: Keys to Successful Business Plan Execution</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A brilliant strategy is worthless without execution. Here’s how to close the gap between planning and doing.
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
                <linearGradient id="grad-execution" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
                <filter id="glow-execution" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-execution)" />

              {/* Abstract shapes representing idea, plan, action */}
              <circle cx="200" cy="300" r="80" fill="hsl(var(--accent))" opacity="0.1" filter="url(#glow-execution)" />
              <text x="200" y="315" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="40" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.6">Idea</text>

              <path d="M 300 300 H 450" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" strokeDasharray="10 5" />
              <path d="M 400 290 L 420 300 L 400 310" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />


              <g transform="translate(600, 300)">
                 <rect x="-100" y="-70" width="200" height="140" rx="10" fill="hsl(var(--primary))" opacity="0.1" filter="url(#glow-execution)" />
                 <line x1="-80" y1="-40" x2="80" y2="-40" stroke="hsl(var(--foreground))" opacity="0.3" strokeWidth="2" />
                 <line x1="-80" y1="-10" x2="50" y2="-10" stroke="hsl(var(--foreground))" opacity="0.3" strokeWidth="2" />
                 <line x1="-80" y1="20" x2="70" y2="20" stroke="hsl(var(--foreground))" opacity="0.3" strokeWidth="2" />
                 <line x1="-80" y1="50" x2="30" y2="50" stroke="hsl(var(--foreground))" opacity="0.3" strokeWidth="2" />
                 <text x="0" y="5" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="40" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.6">Plan</text>
              </g>

              <path d="M 750 300 H 900" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" strokeDasharray="10 5" />
              <path d="M 850 290 L 870 300 L 850 310" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />

              <g transform="translate(1000, 300)">
                 <path d="M-50 -50 L 50 -50 L 70 0 L 50 50 L -50 50 L -70 0 Z" fill="hsl(var(--accent))" opacity="0.2" filter="url(#glow-execution)" />
                 <text x="0" y="15" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="40" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.6">Action</text>
              </g>

            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            Many great ideas and brilliant strategies end up collecting dust on a shelf. Why? Because the gap between planning and doing is notoriously difficult to bridge. Execution is where the rubber meets the road, and it's often the single biggest factor that separates successful ventures from failed ones. It’s a discipline that requires as much rigor and structure as the strategic planning process itself.
          </p>
          
          <p>
            Turning your vision into reality isn't about working harder; it's about working smarter. It requires a systematic approach that ensures clarity, accountability, and adaptability. This article will walk you through the essential keys to successful business plan execution, highlighting the frameworks in Model Toolkit that can help you transform your well-laid plans into tangible results.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">The 5 Keys to Successful Execution</h2>
          <p>
            Follow these five steps to ensure your strategy translates into action:
          </p>
          
          <div className="space-y-6 not-prose">
            {executionSteps.map((step, index) => (
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
                          Use this model now <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Execution is a Continuous Loop</h2>
          <p>
            Effective execution isn't a linear process; it's a continuous cycle of planning, doing, checking, and adjusting. The market will change, your team will evolve, and your initial assumptions will be tested. By using tools like the <strong>Gantt Chart</strong> for planning and the <strong>RACI Matrix</strong> for accountability, you build a resilient system that can adapt to reality without losing sight of the ultimate goal.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to put your plan into action?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start by mapping out your project timeline with our interactive Gantt Chart.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/gantt-chart">
                  Go to Gantt Chart <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

      </article>
    </div>
  );
}
