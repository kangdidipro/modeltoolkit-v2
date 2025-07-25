import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Link from "next/link";

export default function CoffeePage() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="inline-block p-4 bg-primary/10 rounded-full">
            <Coffee className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline">Buy Me a Coffee</h1>
        <p className="text-xl text-muted-foreground">
          If you find Model Toolkit useful, please consider supporting its development.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Your Support Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Model Toolkit is a passion project dedicated to providing free and accessible strategic tools for everyone. Your contribution helps cover server costs, maintenance, and allows for the development of new features and models.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="https://www.buymeacoffee.com/your-username" target="_blank" rel="noopener noreferrer">
              <Coffee className="mr-2 h-5 w-5" />
              Buy Me a Coffee
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
