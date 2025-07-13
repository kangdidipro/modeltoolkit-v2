"use client"

import { useState, useMemo, useRef, type DragEvent } from "react"
import { initialSwotData, type SwotModel, type ModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Wand2, Download, Printer, GripVertical } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { analyzeModelCanvas, type AnalyzeModelCanvasOutput } from "@/ai/flows/model-canvas-analyzer"
import { useToast } from "@/hooks/use-toast"
import { AiInsightsDialog } from "@/components/ai-insights-dialog"

type ColumnKeys = keyof SwotModel;

export default function SwotCanvas() {
  const [data, setData] = useState<SwotModel>(initialSwotData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<AnalyzeModelCanvasOutput | null>(null);
  const [isInsightsDialogOpen, setIsInsightsDialogOpen] = useState(false);
  
  const draggedItem = useRef<{ item: ModelItem; from: ColumnKeys } | null>(null);
  const { toast } = useToast();

  const columns: { key: ColumnKeys; title: string; bg: string }[] = useMemo(() => [
    { key: "strengths", title: "Strengths", bg: "bg-green-100 dark:bg-green-900/40" },
    { key: "weaknesses", title: "Weaknesses", bg: "bg-red-100 dark:bg-red-900/40" },
    { key: "opportunities", title: "Opportunities", bg: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "threats", title: "Threats", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
  ], []);

  const handleAddItem = (column: ColumnKeys) => {
    const newItem: ModelItem = {
      id: `${column}-${Date.now()}`,
      content: "New item...",
    };
    setData(prev => ({ ...prev, [column]: [...prev[column], newItem] }));
    startEditing(newItem);
  };

  const handleDeleteItem = (column: ColumnKeys, itemId: string) => {
    setData(prev => ({
      ...prev,
      [column]: prev[column].filter(item => item.id !== itemId),
    }));
  };
  
  const startEditing = (item: ModelItem) => {
    setEditingItemId(item.id);
    setEditingText(item.content);
  };

  const handleSaveEdit = (column: ColumnKeys) => {
    if (!editingItemId) return;
    setData(prev => ({
      ...prev,
      [column]: prev[column].map(item =>
        item.id === editingItemId ? { ...item, content: editingText } : item
      ),
    }));
    setEditingItemId(null);
    setEditingText("");
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: ModelItem, from: ColumnKeys) => {
    draggedItem.current = { item, from };
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.classList.add("opacity-50", "scale-95");
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>, to: ColumnKeys) => {
    e.preventDefault();
    if (!draggedItem.current) return;
  
    const { item: dragged, from } = draggedItem.current;
  
    if (from === to) return;
  
    setData(prev => {
      const newData = { ...prev };
      // Remove from old column
      newData[from] = newData[from].filter(i => i.id !== dragged.id);
      // Add to new column
      newData[to] = [...newData[to], dragged];
      return newData;
    });
  
    draggedItem.current = null;
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50", "scale-95");
  }

  const handleGetAiInsights = async () => {
    setIsAiLoading(true);
    try {
      const result = await analyzeModelCanvas({
        modelCanvasState: JSON.stringify(data),
        modelType: 'SWOT Analysis',
      });
      setAiInsights(result);
      setIsInsightsDialogOpen(true);
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not get insights. Please try again later.",
      })
    } finally {
      setIsAiLoading(false);
    }
  }

  const handleExport = (type: 'PNG' | 'PDF') => {
    toast({
      title: 'Export not available',
      description: `The ${type} export feature is coming soon!`,
    });
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button onClick={handleGetAiInsights} disabled={isAiLoading}>
          <Wand2 className="mr-2 h-4 w-4" />
          {isAiLoading ? "Analyzing..." : "Get AI Insights"}
        </Button>
        <Button variant="outline" onClick={() => handleExport('PNG')}>
          <Download className="mr-2 h-4 w-4" />
          Export as PNG
        </Button>
        <Button variant="outline" onClick={() => handleExport('PDF')}>
          <Printer className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
        {columns.map(column => (
          <Card key={column.key} className={`${column.bg} flex flex-col min-h-[300px]`}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium font-headline">{column.title}</CardTitle>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAddItem(column.key)}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent
              className="flex-grow space-y-2 p-4 pt-0"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.key)}
            >
              {data[column.key].map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, column.key)}
                  onDragEnd={handleDragEnd}
                  className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-5 w-5 mt-1 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground" />
                    {editingItemId === item.id ? (
                      <Textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => handleSaveEdit(column.key)}
                        autoFocus
                        className="w-full text-sm resize-none"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(column.key) }}
                      />
                    ) : (
                      <p onClick={() => startEditing(item)} className="flex-grow text-sm w-full min-h-[24px]">
                        {item.content}
                      </p>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 shrink-0"
                      onClick={() => handleDeleteItem(column.key, item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {data[column.key].length === 0 && (
                <div className="text-center text-muted-foreground text-sm p-4 border-2 border-dashed rounded-lg">
                  Drop items here or click `+` to add.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {aiInsights && (
        <AiInsightsDialog
          isOpen={isInsightsDialogOpen}
          onOpenChange={setIsInsightsDialogOpen}
          insights={aiInsights}
        />
      )}
    </>
  )
}
