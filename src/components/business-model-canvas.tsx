"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialBusinessModelCanvasData, type BusinessModelCanvasModel, type ModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download, Printer, GripVertical, Save, History, Upload, FileDown, RefreshCw } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type ColumnKeys = keyof BusinessModelCanvasModel;
const LOCAL_STORAGE_KEY = 'business-model-canvas-history';

type HistoryEntry = {
  timestamp: number;
  data: BusinessModelCanvasModel;
};

export default function BusinessModelCanvas() {
  const [data, setData] = useState<BusinessModelCanvasModel>(initialBusinessModelCanvasData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const draggedItem = useRef<{ item: ModelItem; from: ColumnKeys } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
        if (parsedHistory.length > 0) {
          setData(parsedHistory[0].data);
        }
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load saved history.",
      });
    }
  }, [toast]);

  const columns: { key: ColumnKeys; title: string; gridArea: string, bgColor: string }[] = useMemo(() => [
    { key: "keyPartners", title: "Key Partners", gridArea: "partners", bgColor: "bg-purple-100 dark:bg-purple-900/40" },
    { key: "keyActivities", title: "Key Activities", gridArea: "activities", bgColor: "bg-orange-100 dark:bg-orange-900/40" },
    { key: "keyResources", title: "Key Resources", gridArea: "resources", bgColor: "bg-orange-100 dark:bg-orange-900/40" },
    { key: "valuePropositions", title: "Value Propositions", gridArea: "value", bgColor: "bg-teal-100 dark:bg-teal-900/40" },
    { key: "customerRelationships", title: "Customer Relationships", gridArea: "relationships", bgColor: "bg-pink-100 dark:bg-pink-900/40" },
    { key: "channels", title: "Channels", gridArea: "channels", bgColor: "bg-pink-100 dark:bg-pink-900/40" },
    { key: "customerSegments", title: "Customer Segments", gridArea: "segments", bgColor: "bg-indigo-100 dark:bg-indigo-900/40" },
    { key: "costStructure", title: "Cost Structure", gridArea: "costs", bgColor: "bg-red-100 dark:bg-red-900/40" },
    { key: "revenueStreams", title: "Revenue Streams", gridArea: "revenue", bgColor: "bg-green-100 dark:bg-green-900/40" },
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
      newData[from] = newData[from].filter(i => i.id !== dragged.id);
      newData[to] = [...newData[to], dragged];
      return newData;
    });
  
    draggedItem.current = null;
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50", "scale-95");
  }

  const handleSave = () => {
    try {
      const newEntry: HistoryEntry = {
        timestamp: Date.now(),
        data: data,
      };
      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      toast({
        title: "Work Saved",
        description: "Your Business Model Canvas has been saved to history.",
      });
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save your work.",
      });
    }
  };

  const handleLoadFromHistory = (entry: HistoryEntry) => {
    setData(entry.data);
    setIsHistoryOpen(false);
    toast({
      title: "Work Loaded",
      description: `Loaded version from ${new Date(entry.timestamp).toLocaleString()}`,
    });
  };

  const handleExport = (type: 'PNG' | 'PDF') => {
    toast({
      title: 'Export not available',
      description: `The ${type} export feature is coming soon!`,
    });
  }

  const handleXmlImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast({ title: "Import Not Available", description: "This feature is coming soon!" });
    if (event.target.files) {
      event.target.value = '';
    }
  };

  const handleExportXml = () => {
     toast({ title: "Export Not Available", description: "This feature is coming soon!" });
  }
  
  const countTotalItems = (canvasData: BusinessModelCanvasModel) => {
    return Object.values(canvasData).reduce((sum, array) => sum + array.length, 0);
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" onClick={() => setIsHistoryOpen(true)}>
          <History className="mr-2 h-4 w-4" />
          History
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".xml"
          onChange={handleFileChange}
        />
        <Button variant="outline" onClick={handleXmlImportClick}>
          <Upload className="mr-2 h-4 w-4" />
          Import from XML
        </Button>
        <Button variant="outline" onClick={handleExportXml}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as XML
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
      
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-6 w-6"/>
              Saved History for "Business Model Canvas"
            </DialogTitle>
            <DialogDescription>
              Load a past version of your canvas.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-80 pr-6">
            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((entry) => (
                  <div key={entry.timestamp} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{new Date(entry.timestamp).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{countTotalItems(entry.data)} items</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => handleLoadFromHistory(entry)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Load
                      </Button>
                       <Button variant="outline" onClick={handleExportXml}>
                        <FileDown className="mr-2 h-4 w-4" />
                        XML
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-10">No saved history yet. Click "Save" to create a version.</p>
              )}
            </div>
          </ScrollArea>
          
          <DialogFooter className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Your data is saved in your browser's local storage.
              </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div 
        className="grid gap-4"
        style={{
            gridTemplateAreas: `
                "partners activities value relationships segments"
                "partners resources value channels segments"
                "costs costs value revenue revenue"
            `,
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'auto auto auto',
        }}
        >
        {columns.map(column => (
          <Card key={column.key} className={`${column.bgColor} flex flex-col min-h-[200px]`} style={{ gridArea: column.gridArea }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium font-headline">{column.title}</CardTitle>
                 <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleAddItem(column.key)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
                  className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start gap-1">
                    <GripVertical className="h-5 w-5 mt-0.5 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground" />
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
                      <p onClick={() => startEditing(item)} className="flex-grow text-sm w-full min-h-[20px]">
                        {item.content}
                      </p>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                      onClick={() => handleDeleteItem(column.key, item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              {data[column.key].length === 0 && (
                <div className="text-center text-muted-foreground text-xs p-2 border-2 border-dashed rounded-lg">
                  Drop items here or click `+` to add.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
