"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { AnalyzeModelCanvasOutput } from "@/ai/flows/model-canvas-analyzer"
import { CheckCircle, Lightbulb } from "lucide-react"

interface AiInsightsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  insights: AnalyzeModelCanvasOutput | null
}

export function AiInsightsDialog({ isOpen, onOpenChange, insights }: AiInsightsDialogProps) {
  if (!insights) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            AI-Powered Insights
          </DialogTitle>
          <DialogDescription>
            Here are some suggestions to enhance your SWOT analysis based on best practices.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="font-semibold mb-2">Suggestions</h3>
            <ul className="space-y-3">
              {insights.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Rationale</h3>
            <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">
              {insights.rationale}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
