
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const strategicPlanningSteps = [
  {
    name: "1. Define Your Vision and Mission",
    description: [
      "Before you can plan where you're going, you need to know who you are. Your vision is your ultimate long-term goal, while your mission defines your purpose and how you serve your customers. This foundational step provides the 'why' behind everything else you do.",
      "A clear vision and mission statement acts as a compass, guiding your decisions and keeping your entire team aligned. It's the first and most critical step in building a meaningful strategy."
    ],
  },
  {
    name: "2. Conduct a SWOT Analysis",
    description: [
      "A thorough SWOT analysis is essential for understanding your current business landscape. It forces you to take an honest look at your internal Strengths and Weaknesses, as well as the external Opportunities and Threats you face.",
      "This simple 2x2 grid provides immense clarity, helping you leverage what you're good at, address your vulnerabilities, capitalize on market trends, and prepare for potential challenges. It's the diagnostic tool for your business's health."
    ],
    href: "/models/swot"
  },
  {
    name: "3. Set SMART Goals",
    description: [
        "With your vision and analysis in hand, it's time to set concrete goals. Vague aspirations like 'increase sales' are not enough. Your goals must be SMART: Specific, Measurable, Achievable, Relevant, and Time-bound.",
        "For example, a SMART goal would be: 'Increase online sales by 15% in the next quarter by launching a new social media campaign.' This level of clarity makes your objectives actionable and trackable, turning strategy into a tangible plan."
    ],
  },
  {
    name: "4. Develop Your Strategy with a Business Model Canvas",
    description: [
        "How will you achieve your goals? The Business Model Canvas is the perfect tool for sketching out your strategy on a single page. It helps you map out all the key components of your business, from your value proposition and customer segments to your revenue streams and cost structure.",
        "This framework allows you to see how different parts of your business connect and to identify potential areas for innovation. It's a dynamic way to design and test your strategic options before committing significant resources."
    ],
    href: "/models/business-model-canvas"
  },
   {
    name: "5. Create an Action Plan with a Gantt Chart",
    description: [
        "A strategy is only as good as its execution. The final step is to break your strategy down into a detailed action plan. A Gantt Chart is an invaluable tool for this, allowing you to visualize your project timeline, define tasks, set deadlines, and track dependencies.",
        "This creates a clear roadmap for you and your team, ensuring that everyone knows what needs to be done and when. It bridges the critical gap between high-level planning and day-to-day execution, keeping your strategy on track."
    ],
    href: "/models/gantt-chart"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 27, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">A Complete Guide to Strategic Planning for Small Businesses</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A step-by-step guide to building a robust strategic plan that drives growth and clarity for your small business.
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
                <linearGradient id="grad-small-biz" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
                <filter id="glow-small-biz" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-small-biz)" />

              <g transform="translate(600, 300)">
                <path d="M-200 0 L-100 -173.2 L100 -173.2 L200 0 L100 173.2 L-100 173.2 Z" fill="hsl(var(--primary))" opacity="0.1" filter="url(#glow-small-biz)" />
                <path d="M-100 0 L-50 -86.6 L50 -86.6 L100 0 L50 86.6 L-50 86.6 Z" fill="hsl(var(--accent))" opacity="0.15" />
                 <circle cx="0" cy="0" r="30" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" opacity="0.4" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Plan for Growth
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            For many small business owners, "strategic planning" can sound like a daunting corporate exercise reserved for boardrooms and executives. But in reality, it's one of the most powerful tools a small business can have. A good strategic plan is simply a roadmap that helps you make deliberate choices, focus your limited resources, and guide your business toward sustainable growth.
          </p>
          
          <p>
            Without a strategy, it's easy to get caught up in the day-to-day fires, reacting to problems rather than proactively building the future you want. This guide breaks down the strategic planning process into five manageable steps, using practical tools from our toolkit to help you bring clarity and confidence to your business.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">The 5 Steps of Small Business Strategy</h2>
          <p>
            Follow this step-by-step process to build a strategy that works for you:
          </p>
          
          <div className="space-y-6 not-prose">
            {strategicPlanningSteps.map((step, index) => (
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
                          Use this model <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Your Living, Breathing Plan</h2>
          <p>
            Remember, your strategic plan shouldn't be a document that gathers dust. It's a living guide that you should revisit and adjust regularly—at least quarterly. The market changes, new opportunities emerge, and your business evolves. By continuously engaging with your plan, you can stay agile and ensure your small business is always on the path to success.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to build your roadmap?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start by clarifying your current situation with a free, interactive SWOT Analysis.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/swot">
                  Go to SWOT Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 border-t pt-8">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
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
