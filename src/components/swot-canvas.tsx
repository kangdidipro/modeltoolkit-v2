"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialSwotData, type SwotModel, type ModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download, Printer, GripVertical, Save, History, Upload, FileDown } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type ColumnKeys = keyof SwotModel;
const LOCAL_STORAGE_KEY = 'swot-model-data';

export default function SwotCanvas() {
  const [data, setData] = useState<SwotModel>(initialSwotData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  
  const draggedItem = useRef<{ item: ModelItem; from: ColumnKeys } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load data from localStorage on initial render
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load saved data.",
      });
    }
  }, [toast]);

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

  const handleSaveToLocal = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      toast({
        title: "Work Saved",
        description: "Your SWOT analysis has been saved in your browser.",
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

  const handleLoadFromLocal = () => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        setData(JSON.parse(savedData));
        toast({
          title: "Work Loaded",
          description: "Your saved SWOT analysis has been loaded.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "No Saved Data",
          description: "No saved SWOT analysis found in your browser.",
        });
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load saved data.",
      });
    }
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

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleSaveToLocal}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" />
              Load Last Saved
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Loading from history will overwrite your current canvas. Make sure you've saved any changes you want to keep.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLoadFromLocal}>Load</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
    </>
  )
}
