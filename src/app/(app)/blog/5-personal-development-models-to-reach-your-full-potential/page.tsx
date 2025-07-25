import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const personalDevModels = [
  {
    name: "Maslow's Hierarchy of Needs",
    description: [
      "Maslow's Hierarchy provides a foundational framework for understanding your own motivations. By identifying which needs are met and which are not—from basic physiological needs to the highest level of self-actualization—you can create a structured path for personal growth.",
      "Are your safety needs met? Do you feel a sense of belonging? Use this model to perform a personal check-in and identify the areas in your life that need attention to unlock your full potential."
    ],
    href: "/models/maslows-hierarchy"
  },
  {
    name: "The Johari Window",
    description: [
      "Self-awareness is the bedrock of personal development. The Johari Window is a powerful tool for understanding your relationship with yourself and others. It helps you identify your 'Open' self (known to all), 'Blind' spots (what others see but you don't), 'Hidden' self (what you keep private), and the 'Unknown' (potential to be discovered).",
      "By actively seeking feedback to shrink your blind spots and strategically sharing from your hidden self, you can build more authentic relationships and uncover new strengths. It's an essential model for improving emotional intelligence and communication."
    ],
    href: "/models/johari-window"
  },
  {
    name: "Eisenhower Matrix",
    description: [
        "Personal growth requires focused effort, but it's easy to get bogged down in daily urgencies. The Eisenhower Matrix is a simple yet profound tool for prioritizing your time and energy. It forces you to distinguish between what is truly important for your long-term goals and what is merely urgent.",
        "By categorizing your tasks into 'Do,' 'Schedule,' 'Delegate,' and 'Delete,' you can consciously allocate more time to important, non-urgent activities—the very quadrant where most personal development happens. It's a practical way to ensure you're investing in yourself."
    ],
    href: "/models/eisenhower-matrix"
  },
  {
    name: "Flow Model",
    description: [
        "The state of 'flow,' where you are fully immersed and energized by an activity, is where peak performance and deep satisfaction lie. The Flow Model helps you understand the conditions needed to achieve this state: a balance between the level of challenge an activity presents and the level of skill you possess.",
        "Use this model to analyze your daily activities. Are you often bored (high skill, low challenge) or anxious (low skill, high challenge)? By finding or creating activities that put you in the flow channel, you can make learning, working, and growing a more joyful and effective process."
    ],
    href: "/models/flow-model"
  },
  {
    name: "Personal SWOT Analysis",
    description: [
        "While traditionally a business tool, a SWOT analysis is incredibly effective for personal development. It provides a structured way to assess your internal Strengths and Weaknesses, as well as external Opportunities and Threats related to your career and personal goals.",
        "This self-assessment gives you a clear-eyed view of where you stand. You can then create a strategy to leverage your strengths, address your weaknesses, seize opportunities, and mitigate threats. It’s like creating a personalized roadmap for your growth journey."
    ],
    href: "/models/swot"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on July 18, 2024</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">5 Personal Development Models to Reach Your Full Potential</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Use these mental frameworks to build self-awareness, improve productivity, and accelerate your growth.
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
                <linearGradient id="grad-personal-dev" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
                <filter id="glow-personal-dev" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-personal-dev)" />

              {/* Abstract shapes representing growth and potential */}
              <path d="M 150 500 C 300 450, 400 350, 600 300 S 800 150, 1050 100" stroke="hsl(var(--primary))" fill="none" strokeWidth="4" opacity="0.3" filter="url(#glow-personal-dev)" />
              <path d="M 100 100 C 250 150, 350 250, 600 300 S 850 450, 1100 500" stroke="hsl(var(--accent))" fill="none" strokeWidth="4" opacity="0.3" filter="url(#glow-personal-dev)" />
              
              <g transform="translate(600, 300)">
                <circle cx="0" cy="0" r="100" fill="hsl(var(--accent))" opacity="0.05" />
                <circle cx="0" cy="0" r="50" fill="hsl(var(--primary))" opacity="0.1" />
                <circle cx="0" cy="0" r="25" fill="hsl(var(--accent))" opacity="0.2" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Unlock Potential
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            Personal development is a journey of continuous growth, but without a map, it's easy to feel lost. Just as businesses use frameworks to navigate complex markets, you can use mental models to navigate your own path to self-improvement. These frameworks provide structure for your thoughts, helping you identify blind spots, clarify goals, and build habits that last.
          </p>
          
          <p>
            The most powerful aspect of these models is their ability to turn abstract concepts like 'motivation' and 'self-awareness' into tangible actions. They are tools for thinking that empower you to become the architect of your own growth. Here are five essential models from our toolkit that can help you unlock your full potential.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">5 Models to Guide Your Growth</h2>
          <p>
            Start applying these frameworks to gain clarity and accelerate your personal development journey:
          </p>
          
          <div className="space-y-6 not-prose">
            {personalDevModels.map((model, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold font-headline">{model.name}</h3>
                    <div className="text-muted-foreground space-y-4 mt-2">
                        {Array.isArray(model.description) ? 
                            model.description.map((p, i) => <p key={i}>{p}</p>) : 
                            <p>{model.description}</p>
                        }
                    </div>
                     {model.href && (
                      <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href={model.href}>
                          Apply this model <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Integrating Models for Holistic Growth</h2>
          <p>
            The true power of these models is realized when you use them together. Start with a <strong>Personal SWOT Analysis</strong> to get a baseline. Use the <strong>Eisenhower Matrix</strong> to carve out time for growth activities identified in your SWOT. Deepen your self-awareness with the <strong>Johari Window</strong>, and understand your core drivers with <strong>Maslow's Hierarchy</strong>. Finally, use the <strong>Flow Model</strong> to make the process of learning and growing itself more enjoyable and effective.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to start your growth journey?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Begin by exploring your inner world with the Johari Window to improve self-awareness.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/johari-window">
                  Go to Johari Window <ArrowRight className="ml-2 h-5 w-5" />
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
                <Link href="/blog/driving-innovation-in-your-company" className="group block">
                    <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold font-headline mb-2">Driving Innovation in Your Company: Frameworks and Ideas</h3>
                            <p className="text-muted-foreground mb-4">Move beyond brainstorming and use structured models to build a culture of innovation.</p>
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
