import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const businessModels = [
  {
    name: "Freemium Model",
    description: [
      "The Freemium model is a popular strategy for startups, especially in the software industry. It works by offering a basic version of the product for free, with the goal of converting a percentage of free users into paying customers for a premium version with more advanced features, functionality, or resources.",
      "This model is excellent for acquiring a large user base quickly, as the free offering lowers the barrier to entry. The key to success is a well-balanced free product that is useful enough to attract users, but limited enough to create a strong incentive to upgrade. Use the Business Model Canvas to map out how your free and premium features align with your customer segments and revenue streams."
    ],
    href: "/models/business-model-canvas"
  },
  {
    name: "Subscription Model",
    description: [
      "The subscription model focuses on customer retention over one-time sales. Customers pay a recurring fee—typically monthly or annually—to access a product or service. This model provides predictable revenue, which is highly attractive to investors and allows for more stable financial forecasting.",
      "Success with this model depends on continuously providing value to justify the recurring payments. This means regular updates, new features, and excellent customer support are crucial. It's a great fit for services that are used regularly, such as SaaS products, content platforms, or membership communities."
    ],
    href: "/models/business-model-canvas"
  },
  {
    name: "Marketplace Model",
    description: [
      "A marketplace business connects buyers and sellers on a single platform, taking a commission on each transaction. Think of companies like Airbnb, Etsy, or Uber. The primary challenge is solving the 'chicken and egg' problem: you need enough sellers to attract buyers, and enough buyers to attract sellers.",
      "Once established, a marketplace can be incredibly powerful due to network effects. Your platform becomes more valuable as more people use it. To build a successful marketplace, you must provide tools and assurances—like secure payments, reviews, and dispute resolution—that make transactions safe and easy for both parties."
    ],
    href: "/models/porters-five-forces"
  },
  {
    name: "SaaS (Software as a Service) Model",
    description: [
      "SaaS is a software distribution model in which a third-party provider hosts applications and makes them available to customers over the Internet. It's typically monetized via a subscription model. This eliminates the need for organizations to install and run applications on their own computers or in their own data centers.",
      "This model lowers initial costs for customers and provides a steady stream of recurring revenue for the startup. The focus must be on creating a scalable, reliable, and secure product. Analyzing the competitive landscape with Porter's Five Forces can help you position your SaaS product effectively in the market."
    ],
    href: "/models/porters-five-forces"
  },
];

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">Published on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline leading-tight">Understanding Various Business Models for Startup Growth</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choosing the right framework is the first step to building a sustainable and scalable company.
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
                <linearGradient id="grad-growth" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
                <filter id="glow-growth" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-growth)" />

              {/* Abstract shapes representing growth and structure */}
              <path d="M 200 500 C 300 400, 400 400, 500 300 S 600 100, 700 150" stroke="hsl(var(--primary))" fill="none" strokeWidth="4" opacity="0.5" strokeDasharray="10 10" />
              <path d="M 1000 100 C 900 200, 800 200, 700 300 S 600 500, 500 450" stroke="hsl(var(--accent))" fill="none" strokeWidth="4" opacity="0.5" strokeDasharray="10 10" />

              <g transform="translate(250, 200)">
                <rect x="-60" y="-40" width="120" height="80" rx="10" fill="hsl(var(--primary))" opacity="0.1" filter="url(#glow-growth)" />
                <rect x="-50" y="-30" width="100" height="60" rx="5" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                <line x1="-50" y1="0" x2="50" y2="0" stroke="hsl(var(--primary))" strokeWidth="1" />
                <line x1="0" y1="-30" x2="0" y2="30" stroke="hsl(var(--primary))" strokeWidth="1" />
              </g>

              <g transform="translate(950, 400)">
                <circle cx="0" cy="0" r="70" fill="hsl(var(--accent))" opacity="0.1" filter="url(#glow-growth)" />
                <circle cx="0" cy="0" r="60" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
                <circle cx="0" cy="0" r="30" fill="hsl(var(--accent))" opacity="0.2" />
              </g>

              <g transform="translate(600, 500)">
                <path d="M-40 20 L0 -30 L40 20 Z" fill="hsl(var(--foreground))" opacity="0.05" />
              </g>

              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Build to Scale
              </text>
            </svg>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
          <p>
            The foundation of any successful startup isn't just a great idea—it's a solid business model that defines how you create, deliver, and capture value. Choosing the right model from the start is critical, as it influences your product development, marketing strategy, and path to profitability. An ill-fitting model can lead to slow growth and cash flow problems, while the right one can create a powerful engine for scaling your business.
          </p>
          
          <p>
            Understanding the different types of business models available is the first step toward making an informed choice. Each model has its own strengths, weaknesses, and ideal use cases. In this article, we'll explore some of the most common and effective business models for startups, helping you find the perfect framework to turn your vision into a viable and thriving enterprise. Use our <Link href="/models/business-model-canvas">Business Model Canvas</Link> to help you map everything out.
          </p>

          <h2 className="font-headline text-3xl mt-12 mb-4">Key Business Models for Startups</h2>
          <p>
            Here are a few popular models that have proven successful for countless startups:
          </p>
          
          <div className="space-y-6 not-prose">
            {businessModels.map((model, index) => (
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
                          Map this on a canvas <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="font-headline text-3xl mt-12 mb-4">Choosing Your Path</h2>
          <p>
            There is no one-size-fits-all answer. The best business model for your startup depends on your product, your target market, and your long-term goals. We recommend using the <strong>Business Model Canvas</strong> to sketch out different possibilities. This will help you see how the pieces fit together—from your value proposition to your revenue streams—and allow you to make a more strategic decision for sustainable growth.
          </p>
        </div>

        <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to design your business model?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Use our interactive Business Model Canvas to map out your strategy and find the perfect fit for your startup.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/business-model-canvas">
                  Go to Business Model Canvas <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

      </article>
    </div>
  );
}
