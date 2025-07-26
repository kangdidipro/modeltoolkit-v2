
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const swotSteps = [
  {
    name: "1. Be Specific and Objective",
    description: [
      "A SWOT analysis is only as good as the data it's built on. Avoid vague statements. Instead of listing 'good marketing' as a strength, specify 'a highly engaged email list of 50,000 subscribers.' Be honest and objective, even when it comes to your weaknesses. A clear-eyed view is the foundation of a powerful strategy.",
      "Involve different team members to get a variety of perspectives and ensure you're not operating in a bubble. The goal is to create a realistic snapshot of your current situation, not a wish list."
    ],
    href: "/models/swot"
  },
  {
    name: "2. Analyze Internal Factors (Strengths and Weaknesses)",
    description: [
      "Strengths and weaknesses are internal factors within your control. Strengths are the advantages you have over your competitors, such as a strong brand, unique technology, or a talented team. Weaknesses are the areas where you are at a disadvantage, like high costs, a narrow product line, or a lack of resources.",
      "A thorough internal analysis helps you understand what you can leverage and where you need to improve. This is the 'know thyself' part of strategic planning."
    ],
    href: "/models/swot"
  },
  {
    name: "3. Analyze External Factors (Opportunities and Threats)",
    description: [
        "Opportunities and threats are external factors outside of your control. Opportunities are favorable external conditions that you could capitalize on, such as a growing market, new technology, or changing customer tastes. Threats are unfavorable conditions that could harm your business, like new competitors, economic downturns, or new regulations.",
        "Scanning the external environment is crucial for staying ahead of the curve. It helps you identify potential tailwinds to ride and headwinds to prepare for."
    ],
    href: "/models/swot"
  },
  {
    name: "4. Turn Analysis into Action with a TOWS Matrix",
    description: [
        "The real power of a SWOT analysis comes when you use it to formulate strategies. A TOWS matrix is a framework for doing just that by matching internal factors with external ones. It helps you ask four key questions:",
        "<ul><li><strong>Strengths-Opportunities (SO):</strong> How can we use our strengths to seize opportunities?</li><li><strong>Strengths-Threats (ST):</strong> How can we use our strengths to mitigate threats?</li><li><strong>Weaknesses-Opportunities (WO):</strong> How can we use opportunities to overcome our weaknesses?</li><li><strong>Weaknesses-Threats (WT):</strong> How can we minimize our weaknesses and avoid threats?</li></ul>This exercise turns a static analysis into a dynamic, actionable strategic plan."
    ],
    href: "/models/swot"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on August 1, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Conducting an Effective SWOT Analysis for Competitive Advantage</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Go beyond a simple list of bullet points and turn your SWOT analysis into a powerful tool for strategic decision-making.
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
                <linearGradient id="grad-swot" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-swot)" />
              
              <g transform="translate(600, 300) scale(1.2)">
                <path d="M -150 -150 H 150 V 150 H -150 Z" fill="hsl(var(--foreground))" opacity="0.02" />
                <line x1="-150" y1="0" x2="150" y2="0" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
                <line x1="0" y1="-150" x2="0" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />

                <circle cx="-75" cy="-75" r="20" fill="hsl(var(--chart-1))" opacity="0.5" />
                <circle cx="75" cy="-75" r="20" fill="hsl(var(--chart-2))" opacity="0.5" />
                <circle cx="-75" cy="75" r="20" fill="hsl(var(--chart-3))" opacity="0.5" />
                <circle cx="75" cy="75" r="20" fill="hsl(var(--chart-4))" opacity="0.5" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Competitive Edge
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            The SWOT analysis is one of the most well-known tools in the business strategy toolkit, but it's often underutilized. Many treat it as a simple box-ticking exercise, creating a list of points that then sits in a drawer. However, when done correctly, a SWOT analysis is a powerful diagnostic tool that can reveal critical insights and form the bedrock of a robust competitive strategy.
          </p>
          
          <p>
            An effective SWOT analysis goes beyond mere description; it drives action. It helps you understand not just where your business stands today, but how you can position it for future success. This guide will walk you through how to elevate your SWOT analysis from a simple list to a dynamic framework for strategic planning.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">4 Steps to a More Strategic SWOT</h2>
          <p>
            Follow these steps to ensure your analysis is both insightful and actionable:
          </p>
          
          <div className="space-y-6 not-prose">
            {swotSteps.map((step, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{step.name}</h3>
                    <div className="text-muted-foreground space-y-4 mt-2" dangerouslySetInnerHTML={{ __html: Array.isArray(step.description) ? step.description.map(p => `<p>${p}</p>`).join('') : `<p>${step.description}</p>` }}>
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

          <h2 className="font-headline text-3xl mt-12 mb-4">From Insight to Advantage</h2>
          <p>
            A SWOT analysis is a living document that should be revisited regularly as market conditions and your internal capabilities change. By moving from a simple list to a strategic matching exercise with the TOWS matrix, you can transform your SWOT analysis into a repeatable process for identifying and sustaining a competitive advantage.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to find your competitive edge?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Use our interactive SWOT analysis tool to get AI-powered insights and strategic recommendations.
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
                <Link href="/blog/a-complete-guide-to-strategic-planning-for-small-businesses" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">A Complete Guide to Strategic Planning for Small Businesses</h3>
                            <p className="text-muted-foreground mb-4">A step-by-step guide to building a robust strategic plan that drives growth and clarity for your small business.</p>
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

