import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Interactive Canvas",
    description: "Each model comes with an interactive canvas that allows users to easily add, edit, and delete items within each section of the model. This enables users to populate and customize the models according to their specific needs."
  },
  {
    title: "Drag & Drop Functionality",
    description: "Users can seamlessly move items between different blocks within a model using a drag & drop feature to effectively organize their thoughts."
  },
  {
    title: "Save & History",
    description: "User work is saved directly in their browser, allowing easy access to past versions or the ability to load and download as XML. This provides flexibility to revert to previous iterations of a model."
  },
  {
    title: "Import from XML",
    description: "Users can easily upload their data from an XML file to instantly populate a model. This feature is useful for integrating existing data or working with larger datasets."
  },
  {
    title: "Multiple Export Options",
    description: "Once completed, users can export their filled-out models to various formats such as PDF, PNG, or XML. These export options cater to diverse needs, from sharing and presentations to archiving."
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Key Features of Model Toolkit</h1>
        <p className="text-muted-foreground">Discover the powerful features that make Model Toolkit the perfect companion for your strategic planning.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <CheckCircle className="h-6 w-6 text-primary" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
