import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Mastering SWOT: From Analysis to Action",
    description: "Learn how to turn your SWOT analysis into a powerful strategic plan that drives real results for your business.",
    image: "https://placehold.co/600x400.png",
    aiHint: "strategy business",
    link: "#"
  },
  {
    title: "The Ultimate Guide to the Business Model Canvas",
    description: "A step-by-step walkthrough of the Business Model Canvas, helping you map out and innovate your business.",
    image: "https://placehold.co/600x400.png",
    aiHint: "business planning",
    link: "#"
  },
  {
    title: "Productivity Hacks with the Eisenhower Matrix",
    description: "Stop procrastinating and start doing. Discover how to prioritize your tasks effectively using a simple yet powerful tool.",
    image: "https://placehold.co/600x400.png",
    aiHint: "productivity desk",
    link: "#"
  },
  {
    title: "Beyond the Buzzword: What is Agile, Really?",
    description: "An introduction to the Agile methodology and how its principles can transform your team's workflow and project success.",
    image: "https://placehold.co/600x400.png",
    aiHint: "team collaboration",
    link: "#"
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Productivity Insights</h1>
        <p className="text-muted-foreground">Articles on business strategy, personal growth, and productivity.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.title} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
                <Image src={post.image} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={post.aiHint} />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href={post.link}>
                  Read More <ArrowRight className="inline-block ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
