
"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialAdkarModelData, type AdkarModel, type ModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, GripVertical, Save, History, Upload, FileDown, RefreshCw, Image as ImageIcon } from "lucide-react"
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
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import html2canvas from "html2canvas"

type StageKeys = keyof AdkarModel;
const LOCAL_STORAGE_KEY = 'adkar-model-history';

type HistoryEntry = {
  timestamp: number;
  data: AdkarModel;
};

export default function AdkarModelCanvas() {
  const [data, setData] = useState<AdkarModel>(initialAdkarModelData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const draggedItem = useRef<{ item: ModelItem; from: StageKeys } | null>(null);
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

  const stages: { key: StageKeys; title: string; description: string; bg: string }[] = useMemo(() => [
    { key: "awareness", title: "Awareness", description: "Of the need for change.", bg: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "desire", title: "Desire", description: "To participate and support the change.", bg: "bg-purple-100 dark:bg-purple-900/40" },
    { key: "knowledge", title: "Knowledge", description: "On how to change.", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
    { key: "ability", title: "Ability", description: "To implement required skills and behaviors.", bg: "bg-green-100 dark:bg-green-900/40" },
    { key: "reinforcement", title: "Reinforcement", description: "To sustain the change.", bg: "bg-orange-100 dark:bg-orange-900/40" },
  ], []);

  const handleAddItem = (stage: StageKeys) => {
    const newItem: ModelItem = {
      id: `${stage}-${Date.now()}`,
      content: "New element...",
    };
    setData(prev => ({ ...prev, [stage]: [...prev[stage], newItem] }));
    startEditing(newItem);
  };

  const handleDeleteItem = (stage: StageKeys, itemId: string) => {
    setData(prev => ({
      ...prev,
      [stage]: prev[stage].filter(item => item.id !== itemId),
    }));
  };
  
  const startEditing = (item: ModelItem) => {
    setEditingItemId(item.id);
    setEditingText(item.content);
  };

  const handleSaveEdit = (stage: StageKeys) => {
    if (!editingItemId) return;
    setData(prev => ({
      ...prev,
      [stage]: prev[stage].map(item =>
        item.id === editingItemId ? { ...item, content: editingText } : item
      ),
    }));
    setEditingItemId(null);
    setEditingText("");
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: ModelItem, from: StageKeys) => {
    draggedItem.current = { item, from };
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.classList.add("opacity-50", "scale-95");
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>, to: StageKeys) => {
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
        description: "Your ADKAR Model has been saved to history.",
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

        const newAdkarData: AdkarModel = {
            awareness: [], desire: [], knowledge: [], ability: [], reinforcement: []
        };

        Object.keys(newAdkarData).forEach(key => {
            const categoryElement = xmlDoc.getElementsByTagName(key)[0];
            if (categoryElement) {
                const items = Array.from(categoryElement.getElementsByTagName('item')).map(itemEl => ({
                    id: itemEl.getAttribute('id') || `imported-${Date.now()}-${Math.random()}`,
                    content: itemEl.textContent || "",
                }));
                newAdkarData[key as keyof AdkarModel] = items;
            }
        });

        setData(newAdkarData);
        toast({
          title: "Import Successful",
          description: "Your ADKAR Model has been loaded from the XML file.",
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
    let xmlContent = `<adkar_model>\n`;
    for (const [key, items] of Object.entries(data)) {
        xmlContent += `  <${key}>\n`;
        items.forEach(item => {
            xmlContent += `    <item id="${item.id}">${item.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</item>\n`;
        });
        xmlContent += `  </${key}>\n`;
    }
    xmlContent += `</adkar_model>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adkar-model.xml';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  const handleExportCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,Category,Content\n";
    for (const [key, items] of Object.entries(data)) {
        items.forEach(item => {
            const content = `"${item.content.replace(/"/g, '""')}"`;
            csvContent += `${key},${content}\n`;
        });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "adkar-model.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExportPng = () => {
    if (canvasRef.current) {
      toast({
        title: "Exporting as PNG",
        description: "Your canvas is being prepared for download.",
      });
      html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: window.getComputedStyle(document.body).backgroundColor,
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'adkar-model.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const countTotalItems = (modelData: AdkarModel) => {
    return Object.values(modelData).reduce((sum, array) => sum + array.length, 0);
  }

  return (
    <TooltipProvider>
      <div className="canvas-controls mb-4 flex flex-wrap gap-2 no-print">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your current work to browser history.</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={() => setIsHistoryOpen(true)}>
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View and load past saved versions.</p>
          </TooltipContent>
        </Tooltip>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".xml"
          onChange={handleFileChange}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={handleXmlImportClick}>
              <Upload className="mr-2 h-4 w-4" />
              Import from XML
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Load a canvas from an XML file.</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={handleExportXml}>
              <FileDown className="mr-2 h-4 w-4" />
              Export as XML
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your canvas as an XML file.</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={handleExportCsv}>
                <FileDown className="mr-2 h-4 w-4" />
                Export as CSV
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your canvas as a CSV file.</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={handleExportPng}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Export as PNG
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your canvas as a high-quality PNG image.</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-6 w-6"/>
              Saved History for "ADKAR Model"
            </DialogTitle>
            <DialogDescription>
              Load a past version of your model.
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

      <div ref={canvasRef} className="printable-canvas grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start bg-background p-4 rounded-lg">
        {stages.map((stage) => (
          <Card key={stage.key} className={`${stage.bg} flex flex-col`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium font-headline">{stage.title}</CardTitle>
                 <Button size="icon" variant="ghost" className="h-8 w-8 no-print" onClick={() => handleAddItem(stage.key)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{stage.description}</CardDescription>
            </CardHeader>
            <CardContent
              className="flex-grow space-y-2 p-4 pt-0 min-h-[200px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.key)}
            >
              {data[stage.key].map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, stage.key)}
                  onDragEnd={handleDragEnd}
                  className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-5 w-5 mt-1 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground no-print" />
                    {editingItemId === item.id ? (
                      <Textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => handleSaveEdit(stage.key)}
                        autoFocus
                        className="w-full text-sm resize-none"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(stage.key) }}
                      />
                    ) : (
                      <p onClick={() => startEditing(item)} className="flex-grow text-sm w-full min-h-[24px]">
                        {item.content}
                      </p>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 shrink-0 no-print"
                      onClick={() => handleDeleteItem(stage.key, item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {data[stage.key].length === 0 && (
                <div className="text-center text-muted-foreground text-sm p-4 border-2 border-dashed rounded-lg">
                  Drop items here or click `+` to add.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}
