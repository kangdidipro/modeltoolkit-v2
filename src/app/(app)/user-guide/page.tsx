import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, History, Upload, FileDown, Image as ImageIcon, Link2, BarChartBig, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-headline">User Guide</h1>
        <p className="text-xl text-muted-foreground">Learn how to make the most of Model Toolkit's features.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold font-headline">General Features</h2>
        <p className="text-muted-foreground">
          Most models in the toolkit share a common set of powerful features designed to make your workflow seamless and efficient.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> Adding & Editing Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p>To add a new item to a category, click the `+` button in the category's header. To edit the text of an existing item, simply click on the text. Your changes are saved when you click outside the text area.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trash2 className="h-5 w-5" /> Deleting & Moving Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p>To delete an item, hover over it and click the trash can icon. You can also drag and drop items within or between categories to reorganize your canvas.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Saving & Loading Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Use the **Save** button to store a version of your current canvas in your browser's history. Click the **History** button to view and load previously saved versions at any time.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileDown className="h-5 w-5" /> Export & Import</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You can export your work as an **XML** file for backup or sharing, a **CSV** file for use in spreadsheets, or a **PNG** image for presentations. You can import data from an **XML** file to load a canvas.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold font-headline">Model-Specific Features</h2>
        <p className="text-muted-foreground">
          Some models have unique features to provide deeper insights.
        </p>
        <Card className="bg-card/50">
            <CardHeader>
              <Link href="/models/swot">
                <CardTitle className="hover:text-primary transition-colors">SWOT Analysis</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                    <BarChartBig className="h-6 w-6 text-primary mt-1 shrink-0"/>
                    <div>
                        <h3 className="font-semibold">Interactive Scoring</h3>
                        <p className="text-muted-foreground">Each item in your SWOT analysis has a dropdown menu to assign a score from "Very Low" to "Very High". This helps you quantify the impact of each point.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <BrainCircuit className="h-6 w-6 text-primary mt-1 shrink-0"/>
                    <div>
                        <h3 className="font-semibold">Strategy Recommendation</h3>
                        <p className="text-muted-foreground">Based on the average scores of your categories, the tool automatically recommends a strategic approach (e.g., SO - Strengths-Opportunities) to guide your next steps.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
         <Card className="bg-card/50">
            <CardHeader>
              <Link href="/models/business-model-canvas">
                <CardTitle className="hover:text-primary transition-colors">Business Model Canvas</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                    <Link2 className="h-6 w-6 text-primary mt-1 shrink-0"/>
                    <div>
                        <h3 className="font-semibold">Connecting Items</h3>
                        <p className="text-muted-foreground">Click the **Connect Items** button to enter connection mode. Click on two items in different blocks to draw a line between them, visualizing how different parts of your business model relate to each other.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <BarChartBig className="h-6 w-6 text-primary mt-1 shrink-0"/>
                    <div>
                        <h3 className="font-semibold">Interactive Scoring</h3>
                        <p className="text-muted-foreground">Just like the SWOT model, you can assign an importance score to each item on your canvas. This helps you identify the most critical components of your business model, with the average score displayed for each block.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}