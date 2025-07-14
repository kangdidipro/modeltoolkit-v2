"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { type ModelItem } from "@/lib/models"
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

const LOCAL_STORAGE_KEY = 'gantt-chart-history';

// A simplified model for Gantt tasks for now
type GanttTask = ModelItem;
type GanttChartModel = {
  tasks: GanttTask[];
};

const initialGanttChartData: GanttChartModel = {
  tasks: [
    { id: 'task-1', content: 'Task 1: Project Planning' },
    { id: 'task-2', content: 'Task 2: Design Mockups' },
    { id: 'task-3', content: 'Task 3: Development' },
  ],
};

type HistoryEntry = {
  timestamp: number;
  data: GanttChartModel;
};

export default function GanttChartCanvas() {
  const [data, setData] = useState<GanttChartModel>(initialGanttChartData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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

  const handleAddItem = () => {
    const newItem: GanttTask = {
      id: `task-${Date.now()}`,
      content: "New task...",
    };
    setData(prev => ({ ...prev, tasks: [...prev.tasks, newItem] }));
    startEditing(newItem);
  };

  const handleDeleteItem = (itemId: string) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(item => item.id !== itemId),
    }));
  };
  
  const startEditing = (item: GanttTask) => {
    setEditingItemId(item.id);
    setEditingText(item.content);
  };

  const handleSaveEdit = () => {
    if (!editingItemId) return;
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(item =>
        item.id === editingItemId ? { ...item, content: editingText } : item
      ),
    }));
    setEditingItemId(null);
    setEditingText("");
  };

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
        description: "Your Gantt Chart has been saved to history.",
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
  
  const countTotalItems = (modelData: GanttChartModel) => {
    return modelData.tasks.length;
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
              Saved History for "Gantt Chart"
            </DialogTitle>
            <DialogDescription>
              Load a past version of your Gantt Chart.
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
        
      <Card className="min-h-[600px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Task List</CardTitle>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleAddItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Add, edit, and manage your project tasks here. Full chart visualization coming soon.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
           {data.tasks.map(item => (
            <div
              key={item.id}
              className="group bg-card/80 dark:bg-card/50 border rounded-lg p-3 shadow-sm transition-all duration-200 ease-in-out"
            >
              <div className="flex items-start gap-2">
                <GripVertical className="h-5 w-5 mt-1 text-muted-foreground/50 shrink-0" />
                {editingItemId === item.id ? (
                  <Textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleSaveEdit()}
                    autoFocus
                    className="w-full text-sm resize-none"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit() }}
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
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {data.tasks.length === 0 && (
            <div className="text-center text-muted-foreground text-sm p-4 border-2 border-dashed rounded-lg">
              Click `+` to add your first task.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
