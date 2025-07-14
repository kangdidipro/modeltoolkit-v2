
"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialFishboneDiagramData, type FishboneDiagramModel, type ModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download, Printer, GripVertical, Save, History, Upload, FileDown, RefreshCw, Pencil } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
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

type CategoryKeys = keyof Omit<FishboneDiagramModel, 'effect'>;
const LOCAL_STORAGE_KEY = 'fishbone-diagram-history';

type HistoryEntry = {
  timestamp: number;
  data: FishboneDiagramModel;
};

export default function FishboneDiagramCanvas() {
  const [data, setData] = useState<FishboneDiagramModel>(initialFishboneDiagramData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isEditingEffect, setIsEditingEffect] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const draggedItem = useRef<{ item: ModelItem; from: CategoryKeys } | null>(null);
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

  const categories: { key: CategoryKeys; title: string; }[] = useMemo(() => [
    { key: "people", title: "People / Personnel" },
    { key: "process", title: "Process / Methods" },
    { key: "equipment", title: "Equipment / Machines" },
    { key: "materials", title: "Materials" },
    { key: "environment", title: "Environment" },
    { key: "management", title: "Management / Measurement" },
  ], []);

  const handleAddItem = (category: CategoryKeys) => {
    const newItem: ModelItem = {
      id: `${category}-${Date.now()}`,
      content: "New cause...",
    };
    setData(prev => ({ ...prev, [category]: [...prev[category], newItem] }));
    startEditing(newItem);
  };

  const handleDeleteItem = (category: CategoryKeys, itemId: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId),
    }));
  };
  
  const startEditing = (item: ModelItem) => {
    setEditingItemId(item.id);
    setEditingText(item.content);
  };

  const handleSaveItemEdit = (category: CategoryKeys) => {
    if (!editingItemId) return;
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === editingItemId ? { ...item, content: editingText } : item
      ),
    }));
    setEditingItemId(null);
    setEditingText("");
  };

  const handleEffectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({...prev, effect: e.target.value}));
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: ModelItem, from: CategoryKeys) => {
    draggedItem.current = { item, from };
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.classList.add("opacity-50", "scale-95");
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>, to: CategoryKeys) => {
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
        description: "Your Fishbone Diagram has been saved to history.",
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
  
  const countTotalItems = (diagramData: FishboneDiagramModel) => {
    return Object.values(diagramData)
      .filter(val => Array.isArray(val))
      .reduce((sum, array) => sum + (array as ModelItem[]).length, 0);
  }

  const handleExport = (type: 'PNG' | 'PDF' | 'XML') => {
    toast({
      title: 'Not available',
      description: `The ${type} export feature is coming soon!`,
    });
  };

  const handleXmlImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast({ title: "Import Not Available", description: "This feature is coming soon!" });
    if (event.target.files) {
      event.target.value = '';
    }
  };

  const CauseCard = ({ category, title }: { category: CategoryKeys; title: string }) => (
    <Card className="flex flex-col bg-card/60 backdrop-blur-sm min-h-[200px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium font-headline">{title}</CardTitle>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAddItem(category)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent
        className="flex-grow space-y-2 p-4 pt-0"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, category)}
      >
        {data[category].map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item, category)}
            onDragEnd={handleDragEnd}
            className="group bg-card/80 dark:bg-card/50 rounded-lg p-2 shadow-sm transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-start gap-1">
              <GripVertical className="h-5 w-5 mt-0.5 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground" />
              {editingItemId === item.id ? (
                <Textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => handleSaveItemEdit(category)}
                  autoFocus
                  className="w-full text-sm resize-none"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); handleSaveItemEdit(category); } }}
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
                onClick={() => handleDeleteItem(category, item.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
        {data[category].length === 0 && (
          <div className="text-center text-muted-foreground text-xs p-2 border-2 border-dashed rounded-lg">
            Add causes
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
        <Button variant="outline" onClick={() => setIsHistoryOpen(true)}><History className="mr-2 h-4 w-4" /> History</Button>
        <input type="file" ref={fileInputRef} className="hidden" accept=".xml" onChange={handleFileChange} />
        <Button variant="outline" onClick={handleXmlImportClick}><Upload className="mr-2 h-4 w-4" /> Import XML</Button>
        <Button variant="outline" onClick={() => handleExport('XML')}><FileDown className="mr-2 h-4 w-4" /> Export XML</Button>
        <Button variant="outline" onClick={() => handleExport('PNG')}><Download className="mr-2 h-4 w-4" /> Export PNG</Button>
        <Button variant="outline" onClick={() => handleExport('PDF')}><Printer className="mr-2 h-4 w-4" /> Export PDF</Button>
      </div>
      
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><History className="h-6 w-6"/>Saved History</DialogTitle>
            <DialogDescription>Load a past version of your Fishbone Diagram.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-80 pr-6">
            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((entry) => (
                  <div key={entry.timestamp} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{entry.data.effect}</p>
                      <p className="text-sm text-muted-foreground">Saved at {new Date(entry.timestamp).toLocaleString()} with {countTotalItems(entry.data)} items</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => handleLoadFromHistory(entry)}>
                        <RefreshCw className="mr-2 h-4 w-4" />Load
                      </Button>
                      <Button variant="outline" onClick={() => handleExport('XML')}>
                        <FileDown className="mr-2 h-4 w-4" />XML
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-10">No saved history yet.</p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div className="relative overflow-x-auto pb-8">
        <div className="flex items-center min-w-[1000px]">
          {/* Categories */}
          <div className="flex-1 grid grid-cols-3 gap-8 py-8 pr-8">
            <div className="grid grid-rows-2 gap-8">
              {categories.slice(0, 2).map(cat => (
                <div key={cat.key} className="relative pl-12">
                  <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-muted -translate-y-1/2"></div>
                  <CauseCard category={cat.key} title={cat.title} />
                </div>
              ))}
            </div>
            <div className="grid grid-rows-2 gap-8">
              {categories.slice(2, 4).map(cat => (
                 <div key={cat.key} className="relative pl-12">
                  <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-muted -translate-y-1/2"></div>
                  <CauseCard category={cat.key} title={cat.title} />
                </div>
              ))}
            </div>
            <div className="grid grid-rows-2 gap-8">
              {categories.slice(4, 6).map(cat => (
                 <div key={cat.key} className="relative pl-12">
                  <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-muted -translate-y-1/2"></div>
                  <CauseCard category={cat.key} title={cat.title} />
                </div>
              ))}
            </div>
          </div>

          {/* Main spine */}
          <div className="absolute top-1/2 left-0 h-1 bg-muted -translate-y-1/2" style={{width: 'calc(100% - 320px - 2rem)'}}></div>
          
          {/* Head (Effect) */}
          <div className="relative flex-shrink-0 w-80">
             <Card className="bg-blue-100 dark:bg-blue-900/40">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Problem / Effect</CardTitle>
                </CardHeader>
                <CardContent>
                    {isEditingEffect ? (
                        <Input 
                            type="text"
                            value={data.effect}
                            onChange={handleEffectChange}
                            onBlur={() => setIsEditingEffect(false)}
                            onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingEffect(false) }}
                            autoFocus
                            className="text-base"
                        />
                    ) : (
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsEditingEffect(true)}>
                            <p className="text-base font-semibold">{data.effect}</p>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </>
  )
}

    