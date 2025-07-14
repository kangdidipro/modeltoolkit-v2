"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GanttChartCanvas() {
  return (
    <Card className="min-h-[600px]">
      <CardHeader>
        <CardTitle>Gantt Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Interactive canvas coming soon!</p>
      </CardContent>
    </Card>
  );
}
