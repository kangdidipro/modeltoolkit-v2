"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialMckinsey7sFrameworkData, type Mckinsey7sFrameworkModel, type ModelItem } from "@/lib/models"
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
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

type ElementKeys = keyof Mckinsey7sFrameworkModel;
const LOCAL_STORAGE_KEY = 'mckinsey-7s-framework-history';

type HistoryEntry = {
  timestamp: number;
  data: Mckinsey7sFrameworkModel;
};

export default function Mckinsey7sFrameworkCanvas() {
  const [data, setData] = useState<Mckinsey7sFrameworkModel>(initialMckinsey7sFrameworkData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const draggedItem = useRef<{ item: ModelItem; from: ElementKeys } | null>(null);
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

  const elements: { key: ElementKeys; title: string; type: 'Hard' | 'Soft' | 'Central'; gridArea: string; bgColor: string }[] = useMemo(() => [
    { key: "sharedValues", title: "Shared Values", type: 'Central', gridArea: "values", bgColor: "bg-purple-100 dark:bg-purple-900/40" },
    { key: "strategy", title: "Strategy", type: 'Hard', gridArea: "strategy", bgColor: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "structure", title: "Structure", type: 'Hard', gridArea: "structure", bgColor: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "systems", title: "Systems", type: 'Hard', gridArea: "systems", bgColor: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "skills", title: "Skills", type: 'Soft', gridArea: "skills", bgColor: "bg-green-100 dark:bg-green-900/40" },
    { key: "staff", title: "Staff", type: 'Soft', gridArea: "staff", bgColor: "bg-green-100 dark:bg-green-900/40" },
    { key: "style", title: "Style", type: 'Soft', gridArea: "style", bgColor: "bg-green-100 dark:bg-green-900/40" },
  ], []);

  const handleAddItem = (element: ElementKeys) => {
    const newItem: ModelItem = {
      id: `${element}-${Date.now()}`,
      content: "New item...",
    };
    setData(prev => ({ ...prev, [element]: [...prev[element], newItem] }));
    startEditing(newItem);
  };

  const handleDeleteItem = (element: ElementKeys, itemId: string) => {
    setData(prev => ({
      ...prev,
      [element]: prev[element].filter(item => item.id !== itemId),
    }));
  };
  
  const startEditing = (item: ModelItem) => {
    setEditingItemId(item.id);
    setEditingText(item.content);
  };

  const handleSaveEdit = (element: ElementKeys) => {
    if (!editingItemId) return;
    setData(prev => ({
      ...prev,
      [element]: prev[element].map(item =>
        item.id === editingItemId ? { ...item, content: editingText } : item
      ),
    }));
    setEditingItemId(null);
    setEditingText("");
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: ModelItem, from: ElementKeys) => {
    draggedItem.current = { item, from };
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.classList.add("opacity-50", "scale-95");
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>, to: ElementKeys) => {
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
        description: "Your McKinsey 7S Framework has been saved to history.",
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
        link.download = "mckinsey-7s-framework.png";
        link.href = dataUrl;
        link.click();
      } else if (type === 'PDF') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('mckinsey-7s-framework.pdf');
      }
      toast({ title: "Export Successful", description: `Your McKinsey 7S Framework has been downloaded as a ${type}.` });
    } catch (error) {
      console.error("Export failed", error);
      toast({ variant: "destructive", title: "Export Failed", description: "Something went wrong while exporting." });
    }
  }

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

        const newFrameworkData: Mckinsey7sFrameworkModel = {
            strategy: [], structure: [], systems: [],
            sharedValues: [], style: [], staff: [], skills: []
        };

        Object.keys(newFrameworkData).forEach(key => {
            const categoryElement = xmlDoc.getElementsByTagName(key)[0];
            if (categoryElement) {
                const items = Array.from(categoryElement.getElementsByTagName('item')).map(itemEl => ({
                    id: itemEl.getAttribute('id') || `imported-${Date.now()}-${Math.random()}`,
                    content: itemEl.textContent || "",
                }));
                newFrameworkData[key as keyof Mckinsey7sFrameworkModel] = items;
            }
        });

        setData(newFrameworkData);
        toast({
          title: "Import Successful",
          description: "Your McKinsey 7S Framework has been loaded.",
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
    let xmlContent = `<mckinsey_7s_framework>\n`;
    for (const [key, items] of Object.entries(data)) {
        xmlContent += `  <${key}>\n`;
        items.forEach(item => {
            xmlContent += `    <item id="${item.id}">${item.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</item>\n`;
        });
        xmlContent += `  </${key}>\n`;
    }
    xmlContent += `</mckinsey_7s_framework>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mckinsey-7s-framework.xml';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  const countTotalItems = (modelData: Mckinsey7sFrameworkModel) => {
    return Object.values(modelData).reduce((sum, array) => sum + array.length, 0);
  }

  const ElementCard = ({ elKey }: { elKey: ElementKeys }) => {
    const element = elements.find(c => c.key === elKey)!;
    return (
      <Card className={`${element.bgColor} flex flex-col min-h-[200px]`} style={{ gridArea: element.gridArea }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium font-headline">{element.title}</CardTitle>
             <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleAddItem(element.key)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-xs">{element.type} Element</CardDescription>
        </CardHeader>
        <CardContent
          className="flex-grow space-y-2 p-4 pt-0"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, element.key)}
        >
          {data[element.key].map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, element.key)}
              onDragEnd={handleDragEnd}
              className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-start gap-1">
                <GripVertical className="h-5 w-5 mt-0.5 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground" />
                {editingItemId === item.id ? (
                  <Textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleSaveEdit(element.key)}
                    autoFocus
                    className="w-full text-sm resize-none"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(element.key) }}
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
                  onClick={() => handleDeleteItem(element.key, item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
          {data[element.key].length === 0 && (
            <div className="text-center text-muted-foreground text-xs p-2 border-2 border-dashed rounded-lg">
              Drop items here or click `+` to add.
            </div>
          )}
        </CardContent>
      </Card>
    );
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
              Saved History for "McKinsey 7S Framework"
            </DialogTitle>
            <DialogDescription>
              Load a past version of your framework.
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
        ref={canvasRef}
        className="grid gap-4 bg-background p-4 rounded-lg"
        style={{
            gridTemplateAreas: `
                ". strategy ."
                "structure values style"
                "systems staff skills"
            `,
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: 'auto auto auto',
        }}
        >
          {elements.map(el => <ElementCard key={el.key} elKey={el.key} />)}
      </div>
    </>
  )
}
