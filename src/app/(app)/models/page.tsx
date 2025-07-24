import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { categories, modelInfo } from "@/lib/models";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ModelsPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Explore Our Model Toolkit</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          A comprehensive suite of interactive business and productivity models designed to bring clarity to your most complex challenges.
        </p>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="italic text-muted-foreground border-l-4 pl-4">
          "My method is different. I do not rush into actual work. When I get an idea, I start at once building it up in my imagination. I change the construction, make improvements and operate the device in my mind."
        </blockquote>
        <p className="mt-2 text-sm font-semibold text-foreground">- Nikola Tesla</p>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <Image 
          src="/ModelToolkitHero.jpg"
          alt="Team collaborating on a project"
          width={1200}
          height={400}
          className="w-full object-cover"
          priority
        />
      </Card>
      
      <div className="space-y-10">
        {categories.map((category) => (
          <section key={category.name}>
            <h2 className="text-3xl font-bold font-headline mb-6">{category.name}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.models.map(({ id }) => {
                const info = modelInfo[id];
                const Icon = info.icon;
                return (
                  <Link href={`/models/${id}`} key={id} className="group block">
                    <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/50">
                      <CardHeader className="flex-row items-start gap-4 space-y-0">
                         <div className="p-3 bg-primary/10 rounded-lg">
                           <Icon className="h-6 w-6 text-primary" />
                         </div>
                        <div className="flex-1">
                          <CardTitle className="font-headline text-xl">{info.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription>{info.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

       <section className="mt-16">
          <Card className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold font-headline mb-4">Ready to unlock your strategic potential?</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Dive into our collection of interactive models and start bringing clarity to your most complex challenges today.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/models/swot">
                  Start with SWOT Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
    </div>
  );
}
