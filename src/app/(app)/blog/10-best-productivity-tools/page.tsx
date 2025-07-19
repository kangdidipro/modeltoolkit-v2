import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const models = [
  { 
    name: "SWOT Analysis", 
    description: [
      "A SWOT analysis is the cornerstone of strategic planning, providing a clear overview of where your project or business stands. It prompts you to identify Strengths (internal advantages), Weaknesses (internal disadvantages), Opportunities (external factors you can capitalize on), and Threats (external factors that could cause trouble). This simple yet powerful 2x2 grid helps you organize your thoughts and develop a well-rounded strategy.",
      "By mapping out these four areas, you can leverage your strengths to seize opportunities while proactively addressing weaknesses and mitigating threats. It’s an essential first step for everything from launching a new product to evaluating your personal career path, turning abstract factors into a concrete action plan."
    ], 
    href: "/models/swot" 
  },
  { 
    name: "Eisenhower Matrix", 
    description: [
      "The Eisenhower Matrix is a definitive tool for mastering personal and professional productivity by helping you prioritize tasks effectively. It categorizes your to-do list into four quadrants based on two simple criteria: urgency and importance. This helps you distinguish between what's truly important for your long-term goals and what's merely urgent, demanding your immediate attention.",
      "By sorting tasks into 'Do First,' 'Schedule,' 'Delegate,' and 'Delete,' you can cut through the noise of a busy schedule. This framework empowers you to focus your energy on activities that drive significant results, reduce time spent on trivial matters, and ultimately gain control over your workload."
    ], 
    href: "/models/eisenhower-matrix" 
  },
  { 
    name: "Business Model Canvas", 
    description: [
      "The Business Model Canvas is a strategic management template for developing new business models or documenting existing ones. It offers a visual chart with elements describing a firm's or product's value proposition, infrastructure, customers, and finances. It’s a shared language for describing, visualizing, assessing, and changing business models.",
      "This one-page canvas allows your team to collaboratively sketch out and test business ideas, identifying potential weaknesses and strengths in your model. It’s an invaluable tool for startups and established companies alike, providing the clarity needed to innovate and pivot effectively in a changing market."
    ], 
    href: "/models/business-model-canvas" 
  },
  { 
    name: "Pareto Principle (80/20 Rule)", 
    description: [
      "The Pareto Principle, or the 80/20 Rule, is a powerful mental model for optimizing your efforts. It states that for many outcomes, roughly 80% of consequences come from 20% of the causes. This framework helps you identify and focus on the 'vital few' activities that yield the most significant results, rather than getting bogged down by the 'trivial many.'",
      "Whether in business, where 80% of sales might come from 20% of clients, or in personal productivity, where a few key tasks drive the majority of your progress, applying this rule helps you allocate your resources more intelligently. It's a key strategy for maximizing impact with limited time and energy."
    ], 
    href: "/models/pareto-principle" 
  },
  { 
    name: "Maslow's Hierarchy", 
    description: [
      "Maslow's Hierarchy of Needs is a psychological theory that explains human motivation through a five-tier model of needs. From the foundational physiological needs (like food and water) to the pinnacle of self-actualization, this framework provides a structured way to understand what drives people.",
      "In a business context, it's incredibly useful for both marketing and management. You can use it to understand the underlying needs your product fulfills for customers or to create a workplace environment that motivates your team by addressing their needs for safety, belonging, and esteem. It's a fundamental tool for anyone looking to understand human behavior."
    ], 
    href: "/models/maslows-hierarchy" 
  },
  { 
    name: "Porter's Five Forces", 
    description: [
      "Porter's Five Forces is a framework for analyzing the competitive landscape of an industry. It helps you understand the power dynamics at play by examining five key forces: the threat of new entrants, the bargaining power of buyers, the bargaining power of suppliers, the threat of substitute products or services, and the intensity of rivalry among existing competitors.",
      "By evaluating these forces, you can assess the long-term attractiveness of an industry and identify where power lies. This insight is crucial for making strategic decisions, such as entering a new market, launching a new product, or developing a strategy to gain a sustainable competitive advantage."
    ], 
    href: "/models/porters-five-forces" 
  },
  { 
    name: "Gantt Chart", 
    description: [
      "A Gantt Chart is an essential project management tool that provides a visual timeline of all tasks and activities. It breaks down a project into smaller, manageable chunks and maps them out against a calendar, showing start dates, end dates, and dependencies between tasks.",
      "This visual representation makes it easy to track progress, manage resources, and identify potential bottlenecks before they become major issues. For any project with a deadline, a Gantt Chart is an indispensable tool for keeping your team aligned and ensuring that everything stays on schedule."
    ], 
    href: "/models/gantt-chart" 
  },
  { 
    name: "RACI Matrix", 
    description: [
      "The RACI Matrix is a responsibility assignment chart designed to eliminate confusion and improve accountability on projects. It clarifies roles by defining who is Responsible (does the work), Accountable (owns the work), Consulted (provides input), and Informed (is kept up-to-date) for every task or decision.",
      "By clearly mapping out these roles, you can prevent tasks from falling through the cracks and ensure that the right people are involved at the right times. It's a simple but highly effective tool for improving communication, streamlining decision-making, and making sure everyone on the team understands their specific responsibilities."
    ], 
    href: "/models/raci-matrix" 
  },
  { 
    name: "Fishbone Diagram", 
    description: [
      "The Fishbone Diagram, also known as an Ishikawa or cause-and-effect diagram, is a powerful tool for root cause analysis. It helps you systematically explore all the potential causes of a problem by categorizing them into different 'bones,' such as People, Process, Equipment, and Environment.",
      "Instead of jumping to conclusions, this diagram encourages a thorough and structured brainstorming session, helping your team dig deeper to find the underlying issues rather than just treating the symptoms. It’s an excellent way to visualize complex problems and ensure that your solutions are addressing the true source of the issue."
    ], 
    href: "/models/fishbone-diagram" 
  },
  { 
    name: "McKinsey 7S Framework", 
    description: [
      "The McKinsey 7S Framework is a model for organizational analysis that ensures all parts of your organization are working in harmony. It identifies seven key internal elements that must be aligned for a company to be successful: Strategy, Structure, Systems (the 'hard' elements), and Shared Values, Skills, Staff, Style (the 'soft' elements).",
      "This holistic framework is incredibly useful for managing organizational change, identifying areas of misalignment, or diagnosing performance issues. By examining how these seven elements interact, you can get a complete picture of your organization's health and make more informed decisions to improve overall effectiveness."
    ], 
    href: "/models/mckinsey-7s-framework" 
  },
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
              src="/10 Strategic Models to Boost Your Productivity.jpg"
              alt="A person planning on a whiteboard"
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
                    <div className="text-muted-foreground space-y-4 mt-2">
                        {Array.isArray(tool.description) ? 
                            tool.description.map((p, i) => <p key={i}>{p}</p>) : 
                            <p>{tool.description}</p>
                        }
                    </div>
                     {tool.href && (
                      <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
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
