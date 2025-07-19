import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const models = [
  { name: "SWOT Analysis", description: "Analyze your project's strengths, weaknesses, opportunities, and threats for a 360-degree strategic view.", href: "/models/swot" },
  { name: "Eisenhower Matrix", description: "Boost personal productivity by prioritizing tasks based on urgency and importance.", href: "/models/eisenhower-matrix" },
  { name: "Business Model Canvas", description: "Visualize and refine your entire business on a single, powerful canvas.", href: "/models/business-model-canvas" },
  { name: "Pareto Principle (80/20 Rule)", description: "Identify the 20% of efforts that yield 80% of the results to maximize your impact.", href: "/models/pareto-principle" },
  { name: "Maslow's Hierarchy", description: "Understand motivation—of your team or your customers—by analyzing fundamental human needs.", href: "/models/maslows-hierarchy" },
  { name: "Porter's Five Forces", description: "Assess the competitive landscape of your industry to find your strategic advantage.", href: "/models/porters-five-forces" },
  { name: "Gantt Chart", description: "Plan and track your project timeline visually to keep everything on schedule.", href: "/models/gantt-chart" },
  { name: "RACI Matrix", description: "Eliminate confusion by clearly defining who is Responsible, Accountable, Consulted, and Informed for every task.", href: "/models/raci-matrix" },
  { name: "Fishbone Diagram", description: "Drill down into complex problems to find their root causes systematically.", href: "/models/fishbone-diagram" },
  { name: "McKinsey 7S Framework", description: "Ensure your organization's elements are aligned for peak performance and health.", href: "/models/mckinsey-7s-framework" },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">10 Strategic Models to Boost Your Productivity</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the mental frameworks in Model Toolkit that help you think smarter, not just work harder.
          </p>
        </header>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="A person planning on a whiteboard"
              data-ai-hint="strategy whiteboard"
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            In a world focused on getting more done, true productivity isn't just about managing tasks—it's about the quality of your thinking. The right mental model can transform a complex problem into a clear set of actions, saving you hours of confusion and rework. That's why the most effective "productivity tools" are often frameworks that structure your thoughts.
          </p>
          
          <p>
            Here at Model Toolkit, we've compiled a list of ten essential strategic models that do just that. They are designed to bring clarity to everything from daily task management to long-term business strategy. By integrating these structured thinking tools into your workflow, you can make better decisions, align your team, and achieve your goals with greater focus and efficiency.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">The Ultimate Strategic Toolkit</h2>
          <p>
            Here are our top 10 picks for models that can transform the way you work and think:
          </p>
          
          <div className="space-y-6 not-prose">
            {models.map((tool, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{tool.name}</h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                     {tool.href && (
                      <Button asChild variant="link" className="p-0 h-auto mt-2 text-primary">
                        <Link href={tool.href}>
                          Try this model <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">From Thinking to Doing</h2>
          <p>
            The power of these models lies in their ability to bridge the gap between idea and action. You can start by using the <strong>Eisenhower Matrix</strong> to clear your daily schedule, then use a <strong>Business Model Canvas</strong> to map out a new venture, and analyze its viability with <strong>Porter's Five Forces</strong>. Model Toolkit provides the interactive space to connect these ideas, turning abstract frameworks into concrete plans.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to think more strategically?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start applying these structured models to your challenges with Model Toolkit's interactive canvases.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/swot">
                  Explore All Models <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

      </article>
    </div>
  );
}
