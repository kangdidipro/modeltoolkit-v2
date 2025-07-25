import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const strategySteps = [
  {
    name: "1. Situational Analysis",
    description: [
      "The first step in formulating any strategy is to understand your current position. This involves looking both internally at your organization and externally at the market. A thorough situational analysis provides the critical context needed to make informed decisions.",
      "Our interactive SWOT Analysis is the perfect tool for this. It guides you to identify your Strengths, Weaknesses, Opportunities, and Threats, giving you a 360-degree view of your landscape. For a deeper dive into your industry, use Porter's Five Forces to understand the competitive pressures at play."
    ],
    href: "/models/swot"
  },
  {
    name: "2. Define Your Vision, Mission, and Objectives",
    description: [
      "With a clear understanding of your situation, you can define where you want to go. Your vision is your long-term aspiration, your mission is your purpose, and your objectives are the specific, measurable goals that will get you there.",
      "This step is about setting a clear direction. Objectives should be SMART (Specific, Measurable, Achievable, Relevant, Time-bound). This clarity ensures that everyone in the organization is aligned and working towards the same outcomes."
    ],
  },
  {
    name: "3. Develop Strategic Options",
    description: [
        "Based on your analysis and objectives, you can now brainstorm potential strategies. This is a creative process where you explore different paths to achieve your goals. Should you focus on market penetration, product development, market development, or diversification?",
        "This is a great time to use tools like the Business Model Canvas to sketch out how different strategies might work in practice. It allows you to visualize how your value proposition, customer segments, and revenue streams would change with each option."
    ],
    href: "/models/business-model-canvas"
  },
  {
    name: "4. Strategy Evaluation and Selection",
    description: [
        "Not all strategic options are created equal. You must evaluate each option against a set of criteria, such as feasibility, risk, and potential return. This step involves critical thinking and often requires making tough choices about where to allocate resources.",
        "The Pareto Principle (80/20 Rule) can be a useful mental model here. Focus on the strategies that are likely to deliver the most significant results. The goal is to select the strategy that offers the best chance of achieving your objectives while aligning with your company's values and capabilities."
    ],
    href: "/models/pareto-principle"
  },
    {
    name: "5. Implementation and Execution",
    description: [
        "A brilliant strategy is useless without effective execution. This is where the plan is put into action. It requires careful planning, resource allocation, and project management. A Gantt Chart is an excellent tool for mapping out the timeline, dependencies, and milestones of your strategic initiatives.",
        "Clear communication is essential during this phase. A RACI Matrix can help clarify roles and responsibilities, ensuring that everyone knows who is Responsible, Accountable, Consulted, and Informed for each task. This eliminates confusion and empowers your team to execute with confidence."
    ],
    href: "/models/gantt-chart"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 21, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Formulating a Strong Business Strategy: Step-by-Step</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A clear roadmap is the foundation of any successful venture. Here’s how to build one.
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
                <linearGradient id="grad-strategy" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
                <filter id="glow-strategy" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-strategy)" />

              {/* Abstract shapes representing a path or steps */}
              <path d="M 150 450 C 300 450, 250 150, 450 150 S 600 450, 750 450 S 900 150, 1050 150" stroke="hsl(var(--primary))" fill="none" strokeWidth="3" opacity="0.4" strokeDasharray="8 8" />
              <path d="M 100 250 L 300 250 L 350 300 L 250 300 Z" fill="hsl(var(--primary))" opacity="0.1" filter="url(#glow-strategy)" />
              <path d="M 500 350 L 700 350 L 750 400 L 650 400 Z" fill="hsl(var(--accent))" opacity="0.15" filter="url(#glow-strategy)" />
              <path d="M 850 200 L 1050 200 L 1100 250 L 1000 250 Z" fill="hsl(var(--primary))" opacity="0.1" filter="url(#glow-strategy)" />

              <circle cx="150" cy="450" r="10" fill="hsl(var(--primary))" opacity="0.7"/>
              <circle cx="450" cy="150" r="10" fill="hsl(var(--accent))" opacity="0.7"/>
              <circle cx="750" cy="450" r="10" fill="hsl(var(--primary))" opacity="0.7"/>
              <circle cx="1050" cy="150" r="10" fill="hsl(var(--accent))" opacity="0.7"/>
              
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Chart Your Course
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            A well-defined strategy is more than just a plan; it's a compass that guides every decision your organization makes. It aligns your team, focuses your resources, and provides a clear path to achieving your goals. Without a strong strategy, businesses often drift, reacting to market changes rather than proactively shaping their future. The process of formulating a strategy forces you to ask the tough questions and make deliberate choices about who you are and where you are going.
          </p>
          
          <p>
            At Model Toolkit, we believe that the best strategies are built on a foundation of clear thinking and structured analysis. Our interactive tools are designed to guide you through each stage of the strategic planning process, from initial analysis to final execution. This article will walk you through the essential steps to create a robust strategy, highlighting which models can help you along the way.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">The 5 Steps to a Powerful Strategy</h2>
          <p>
            Follow these five steps to build a strategy that drives results:
          </p>
          
          <div className="space-y-6 not-prose">
            {strategySteps.map((step, index) => (
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
                          Start with this model <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Strategy is a Living Process</h2>
          <p>
            Remember, strategy is not a one-time event. It's a continuous cycle of planning, executing, and adapting. The market will change, new competitors will emerge, and your organization will evolve. Regularly revisit your strategic plan, using the models in this toolkit to test your assumptions and refine your approach. A great strategy is one that is both clear in its direction and flexible in its execution.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to build your strategy?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Begin with a SWOT analysis to understand your current landscape and build from there.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/swot">
                  Go to SWOT Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

      </article>
    </div>
  );
}
