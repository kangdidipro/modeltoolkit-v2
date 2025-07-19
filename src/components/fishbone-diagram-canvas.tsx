
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
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

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
  const canvasRef = useRef<HTMLDivElement>(null);
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

  const categories: { key: CategoryKeys; title: string; bgColor: string; }[] = useMemo(() => [
    { key: "people", title: "People / Personnel", bgColor: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "process", title: "Process / Methods", bgColor: "bg-purple-100 dark:bg-purple-900/40" },
    { key: "equipment", title: "Equipment / Machines", bgColor: "bg-yellow-100 dark:bg-yellow-900/40" },
    { key: "materials", title: "Materials", bgColor: "bg-green-100 dark:bg-green-900/40" },
    { key: "environment", title: "Environment", bgColor: "bg-orange-100 dark:bg-orange-900/40" },
    { key: "management", title: "Management / Measurement", bgColor: "bg-pink-100 dark:bg-pink-900/40" },
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
    setData(prev => {
        const newData = {...prev};
        const categoryItems = newData[category].map(item =>
            item.id === editingItemId ? { ...item, content: editingText } : item
        );
        newData[category] = categoryItems as ModelItem[];
        return newData;
    });
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

  const handleExport = async (type: 'PNG' | 'PDF') => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    toast({ title: "Exporting...", description: `Generating your ${type} file.` });

    try {
        const canvas = await html2canvas(canvasElement, {
            backgroundColor: null,
            scale: 2,
        });

        if (type === 'PNG') {
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "fishbone-diagram.png";
            link.href = dataUrl;
            link.click();
        } else if (type === 'PDF') {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width + 50, canvas.height + 50] // Add some padding
            });
            pdf.addImage(imgData, 'PNG', 25, 25, canvas.width, canvas.height);
            pdf.save('fishbone-diagram.pdf');
        }
        toast({ title: "Export Successful", description: `Your Fishbone Diagram has been downloaded as a ${type}.` });
    } catch (error) {
        console.error("Export failed", error);
        toast({ variant: "destructive", title: "Export Failed", description: "Something went wrong while exporting." });
    }
  };

  const handleXmlImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const xmlString = e.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");

        const errorNode = xmlDoc.querySelector("parsererror");
        if (errorNode) {
          throw new Error("Failed to parse XML.");
        }

        const newDiagramData: FishboneDiagramModel = {
            effect: "", people: [], process: [], equipment: [],
            materials: [], environment: [], management: []
        };
        
        newDiagramData.effect = xmlDoc.getElementsByTagName('effect')[0]?.textContent || "Problem/Effect";

        Object.keys(newDiagramData).forEach(key => {
            if (key === 'effect') return;
            const categoryElement = xmlDoc.getElementsByTagName(key)[0];
            if (categoryElement) {
                const items = Array.from(categoryElement.getElementsByTagName('item')).map(itemEl => ({
                    id: itemEl.getAttribute('id') || `imported-${Date.now()}-${Math.random()}`,
                    content: itemEl.textContent || "",
                }));
                newDiagramData[key as CategoryKeys] = items;
            }
        });

        setData(newDiagramData);
        toast({
          title: "Import Successful",
          description: "Your Fishbone Diagram has been loaded.",
        });

      } catch (error) {
        console.error("XML Import Error:", error);
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: "The selected file could not be parsed. Please check the file format.",
        });
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsText(file);
  };

  const handleExportXml = () => {
    let xmlContent = `<fishbone_diagram>\n`;
    xmlContent += `  <effect>${data.effect.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</effect>\n`;
    for (const [key, items] of Object.entries(data)) {
        if (key === 'effect') continue;
        xmlContent += `  <${key}>\n`;
        (items as ModelItem[]).forEach(item => {
            xmlContent += `    <item id="${item.id}">${item.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</item>\n`;
        });
        xmlContent += `  </${key}>\n`;
    }
    xmlContent += `</fishbone_diagram>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fishbone-diagram.xml';
    a.click();
    URL.revokeObjectURL(url);
  }

  const CauseCard = ({ categoryInfo }: { categoryInfo: { key: CategoryKeys; title: string; bgColor: string; } }) => {
    return (
      <Card className={`flex flex-col min-h-[200px] ${categoryInfo.bgColor}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium font-headline">{categoryInfo.title}</CardTitle>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAddItem(categoryInfo.key)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent
          className="flex-grow space-y-2 p-4 pt-0"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, categoryInfo.key)}
        >
          {data[categoryInfo.key].map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, categoryInfo.key)}
              onDragEnd={handleDragEnd}
              className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-start gap-1">
                <GripVertical className="h-5 w-5 mt-0.5 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground" />
                {editingItemId === item.id ? (
                  <Textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleSaveItemEdit(categoryInfo.key)}
                    autoFocus
                    className="w-full text-sm resize-none"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); handleSaveItemEdit(categoryInfo.key); } }}
                  />
                ) : (
                  <p onClick={() => startEditing(item)} className="flex-grow text-sm w-full min-h-[20px] cursor-text">
                    {item.content}
                  </p>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                  onClick={() => handleDeleteItem(categoryInfo.key, item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
          {data[categoryInfo.key].length === 0 && (
            <div className="text-center text-muted-foreground text-xs p-2 border-2 border-dashed rounded-lg">
              Add causes
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
        <Button variant="outline" onClick={() => setIsHistoryOpen(true)}><History className="mr-2 h-4 w-4" /> History</Button>
        <input type="file" ref={fileInputRef} className="hidden" accept=".xml" onChange={handleFileChange} />
        <Button variant="outline" onClick={handleXmlImportClick}><Upload className="mr-2 h-4 w-4" /> Import from XML</Button>
        <Button variant="outline" onClick={handleExportXml}><FileDown className="mr-2 h-4 w-4" /> Export as XML</Button>
        <Button variant="outline" onClick={() => handleExport('PNG')}><Download className="mr-2 h-4 w-4" /> Export as PNG</Button>
        <Button variant="outline" onClick={() => handleExport('PDF')}><Printer className="mr-2 h-4 w-4" /> Export as PDF</Button>
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
                      <Button variant="outline" onClick={() => handleExportXml()}>
                        <FileDown className="mr-2 h-4 w-4" />XML
                      </Button>
                    </div>
                  </div>
                ))
              ) : <p className="text-muted-foreground text-center py-10">No saved history yet.</p>}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div ref={canvasRef} className="relative overflow-x-auto pb-8 bg-background p-4 rounded-lg">
        <div className="flex items-center min-w-[1000px]">
          {/* Categories */}
          <div className="flex-1 grid grid-cols-3 gap-8 py-8 pr-8">
            {/* Top row */}
            {categories.slice(0,3).map(cat => (
              <div key={cat.key} className="relative pt-12">
                <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-muted -translate-x-1/2"></div>
                <CauseCard categoryInfo={cat} />
              </div>
            ))}
            {/* Bottom row */}
            {categories.slice(3,6).map(cat => (
              <div key={cat.key} className="relative pb-12">
                <div className="absolute bottom-0 left-1/2 w-0.5 h-12 bg-muted -translate-x-1/2"></div>
                <CauseCard categoryInfo={cat} />
              </div>
            ))}
          </div>

          {/* Main spine */}
          <div className="absolute top-1/2 left-0 h-1 bg-muted -translate-y-1/2" style={{width: 'calc(100% - 320px - 2rem)'}}></div>
          
          {/* Head (Effect) */}
          <div className="relative flex-shrink-0 w-80">
             <Card className="bg-red-100 dark:bg-red-900/40">
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
                        <div className="flex items-center justify-between cursor-text" onClick={() => setIsEditingEffect(true)}>
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
