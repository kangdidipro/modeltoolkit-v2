
"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialBostonMatrixData, type BostonMatrixModel, type ModelItem } from "@/lib/models"
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

type ColumnKeys = keyof BostonMatrixModel;
const LOCAL_STORAGE_KEY = 'boston-matrix-history';

type HistoryEntry = {
  timestamp: number;
  data: BostonMatrixModel;
};

export default function BostonMatrixCanvas() {
  const [data, setData] = useState<BostonMatrixModel>(initialBostonMatrixData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const draggedItem = useRef<{ item: ModelItem; from: ColumnKeys } | null>(null);
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

  const columns: { key: ColumnKeys; title: string; description: string; bg: string }[] = useMemo(() => [
    { key: "stars", title: "Stars", description: "High Growth, High Share", bg: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "questionMarks", title: "Question Marks", description: "High Growth, Low Share", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
    { key: "cashCows", title: "Cash Cows", description: "Low Growth, High Share", bg: "bg-green-100 dark:bg-green-900/40" },
    { key: "dogs", title: "Dogs", description: "Low Growth, Low Share", bg: "bg-red-100 dark:bg-red-900/40" },
  ], []);

  const handleAddItem = (column: ColumnKeys) => {
    const newItem: ModelItem = {
      id: `${column}-${Date.now()}`,
      content: "New product...",
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
        description: "Your Boston Matrix has been saved to history.",
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
        link.download = "boston-matrix.png";
        link.href = dataUrl;
        link.click();
      } else if (type === 'PDF') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('boston-matrix.pdf');
      }
      toast({ title: "Export Successful", description: `Your Boston Matrix has been downloaded as a ${type}.` });
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

        const newMatrixData: BostonMatrixModel = {
            stars: [], questionMarks: [], cashCows: [], dogs: []
        };

        Object.keys(newMatrixData).forEach(key => {
            const categoryElement = xmlDoc.getElementsByTagName(key)[0];
            if (categoryElement) {
                const items = Array.from(categoryElement.getElementsByTagName('item')).map(itemEl => ({
                    id: itemEl.getAttribute('id') || `imported-${Date.now()}-${Math.random()}`,
                    content: itemEl.textContent || "",
                }));
                newMatrixData[key as keyof BostonMatrixModel] = items;
            }
        });

        setData(newMatrixData);
        toast({
          title: "Import Successful",
          description: "Your Boston Matrix has been loaded from the XML file.",
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
    let xmlContent = `<boston_matrix>\n`;
    for (const [key, items] of Object.entries(data)) {
        xmlContent += `  <${key}>\n`;
        items.forEach(item => {
            xmlContent += `    <item id="${item.id}">${item.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</item>\n`;
        });
        xmlContent += `  </${key}>\n`;
    }
    xmlContent += `</boston_matrix>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'boston-matrix.xml';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  const countTotalItems = (matrixData: BostonMatrixModel) => {
    return Object.values(matrixData).reduce((sum, array) => sum + array.length, 0);
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
              Saved History for "Boston Matrix"
            </DialogTitle>
            <DialogDescription>
              Load a past version of your matrix.
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

      <div ref={canvasRef} className="grid gap-6 md:grid-cols-2 items-start bg-background p-4 rounded-lg">
        {columns.map(column => (
          <Card key={column.key} className={`${column.bg} flex flex-col min-h-[300px]`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium font-headline">{column.title}</CardTitle>
                 <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAddItem(column.key)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{column.description}</CardDescription>
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
    </>
  )
}
