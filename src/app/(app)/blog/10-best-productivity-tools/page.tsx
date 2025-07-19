import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const tools = [
  { name: "Trello", description: "For visual project management using boards, lists, and cards." },
  { name: "Slack", description: "For real-time team communication and collaboration, reducing email clutter." },
  { name: "Notion", description: "An all-in-one workspace for notes, tasks, wikis, and databases." },
  { name: "Asana", description: "For managing team projects and tasks with timelines and detailed tracking." },
  { name: "Todoist", description: "A simple yet powerful to-do list manager to organize your tasks." },
  { name: "Evernote", description: "For note-taking, organizing, and archiving ideas and projects." },
  { name: "Zapier", description: "To automate workflows by connecting your favorite apps and services." },
  { name: "Google Workspace", description: "An integrated suite of collaboration and productivity apps." },
  { name: "Loom", description: "For quick video messaging to explain complex ideas and reduce meetings." },
  { name: "Model Toolkit", description: "For structured thinking and strategic planning using established business models." },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">10 Best Productivity Tools to Boost Your Work Efficiency</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the tools that can help you organize, collaborate, and achieve more in less time.
          </p>
        </header>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="A well-organized desk setup"
              data-ai-hint="desk setup"
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            In a world filled with distractions, finding the right tools to stay focused and productive is more important than ever. The right productivity stack can streamline your workflow, enhance collaboration, and ultimately give you back your most valuable asset: time. Whether you're part of a large team or a solo entrepreneur, these tools can help you achieve your goals more efficiently.
          </p>
          
          <p>
            We've compiled a list of ten essential productivity tools that cater to various needs, from project management to strategic planning. Integrating even a few of these into your daily routine can lead to significant improvements in your work efficiency and overall output.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">The Ultimate Productivity Stack</h2>
          <p>
            Here are our top 10 picks for tools that can transform the way you work:
          </p>
          
          <div className="space-y-6 not-prose">
            {tools.map((tool, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{tool.name}</h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Finding Your Perfect Workflow</h2>
          <p>
            The key to productivity isn't just about using these tools, but about integrating them into a seamless workflow. For instance, you can plan a project in Asana, discuss it in Slack, document it in Notion, and use <strong>Model Toolkit</strong> to define the high-level strategy with frameworks like the Eisenhower Matrix or a SWOT analysis. By combining tools, you create a powerful system that supports every stage of your work, from initial idea to final execution.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to think more strategically?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Start applying structured models to your personal and professional challenges with Model Toolkit.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/swot">
                  Explore Strategic Models <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

      </article>
    </div>
  );
}
