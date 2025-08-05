
"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialSwotData, type SwotModel, type ScoredModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, GripVertical, Save, History, Upload, FileDown, RefreshCw, Image as ImageIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter as DialogFooterComponent
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import html2canvas from "html2canvas"
import { usePathname } from "next/navigation"
import { trackEvent } from "@/lib/tracking"
import { PolarGrid, PolarAngleAxis, Radar, RadarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


type ColumnKeys = keyof SwotModel;
const LOCAL_STORAGE_KEY = 'swot-model-history-v2';
const MODEL_NAME = "SWOT Analysis";

type HistoryEntry = {
  timestamp: number;
  data: SwotModel;
  title: string;
  creator: string;
};

export default function SwotCanvas() {
  const [data, setData] = useState<SwotModel>(initialSwotData);
  const [title, setTitle] = useState("My SWOT Analysis");
  const [creator, setCreator] = useState("Analysis created by");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const draggedItem = useRef<{ item: ScoredModelItem; from: ColumnKeys } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const pathname = usePathname();

  const scoreLabels: { [key: number]: string } = {
    1: "Very Low",
    2: "Low",
    3: "Medium",
    4: "High",
    5: "Very High",
  };

  const trackCanvasEvent = (elementClicked: string) => {
    trackEvent({
        eventName: 'canvas_interaction',
        modelName: MODEL_NAME,
        elementClicked,
        path: pathname,
    });
  };

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedHistory) {
        const parsedHistory: HistoryEntry[] = JSON.parse(savedHistory);
        setHistory(parsedHistory);
        if (parsedHistory.length > 0) {
          setData(parsedHistory[0].data);
          setTitle(parsedHistory[0].title || "My SWOT Analysis");
          setCreator(parsedHistory[0].creator || "Analysis created by");
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

  const columns: { key: ColumnKeys; title: string; bg: string }[] = useMemo(() => [
    { key: "strengths", title: "Strengths", bg: "bg-green-100 dark:bg-green-900/40" },
    { key: "weaknesses", title: "Weaknesses", bg: "bg-red-100 dark:bg-red-900/40" },
    { key: "opportunities", title: "Opportunities", bg: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "threats", title: "Threats", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
  ], []);

  const handleAddItem = (column: ColumnKeys) => {
    const newItem: ScoredModelItem = {
      id: `${column}-${Date.now()}`,
      content: "New item...",
      score: 3,
    };
    setData(prev => ({ ...prev, [column]: [...prev[column], newItem] }));
    startEditing(newItem);
    trackCanvasEvent(`add_item_${column}`);
  };

  const handleDeleteItem = (column: ColumnKeys, itemId: string) => {
    setData(prev => ({
      ...prev,
      [column]: prev[column].filter(item => item.id !== itemId),
    }));
  };
  
  const startEditing = (item: ScoredModelItem) => {
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

  const handleScoreChange = (column: ColumnKeys, itemId: string, newScore: string) => {
    setData(prev => ({
      ...prev,
      [column]: prev[column].map(item =>
        item.id === itemId ? { ...item, score: parseInt(newScore, 10) } : item
      ),
    }));
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: ScoredModelItem, from: ColumnKeys) => {
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
    trackCanvasEvent(`drag_and_drop_item`);
    draggedItem.current = null;
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50", "scale-95");
  }

  const handleSave = () => {
    trackCanvasEvent('save_to_history');
    try {
      const newEntry: HistoryEntry = {
        timestamp: Date.now(),
        data: data,
        title,
        creator,
      };
      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      toast({
        title: "Work Saved",
        description: "Your SWOT analysis has been saved to history.",
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
    trackCanvasEvent('load_from_history');
    setData(entry.data);
    setTitle(entry.title || "My SWOT Analysis");
    setCreator(entry.creator || "Analysis created by");
    setIsHistoryOpen(false);
    toast({
      title: "Work Loaded",
      description: `Loaded version from ${new Date(entry.timestamp).toLocaleString()}`,
    });
  };

  const handleXmlImportClick = () => {
    trackCanvasEvent('import_xml_click');
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    trackCanvasEvent('import_xml_file_selected');
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

        const titleElement = xmlDoc.getElementsByTagName('title')[0];
        const creatorElement = xmlDoc.getElementsByTagName('creator')[0];
        setTitle(titleElement ? titleElement.textContent || '' : "My SWOT Analysis");
        setCreator(creatorElement ? creatorElement.textContent || '' : "Analysis created by");

        const newSwotData: SwotModel = {
            strengths: [],
            weaknesses: [],
            opportunities: [],
            threats: [],
        };

        Object.keys(newSwotData).forEach(key => {
            const categoryElement = xmlDoc.getElementsByTagName(key)[0];
            if (categoryElement) {
                const items = Array.from(categoryElement.getElementsByTagName('item')).map(itemEl => ({
                    id: itemEl.getAttribute('id') || `imported-${Date.now()}-${Math.random()}`,
                    content: itemEl.textContent || "",
                    score: parseInt(itemEl.getAttribute('score') || '3', 10),
                }));
                newSwotData[key as keyof SwotModel] = items;
            }
        });

        setData(newSwotData);
        toast({
          title: "Import Successful",
          description: "Your SWOT analysis has been loaded from the XML file.",
        });
      } catch (error) {
        console.error("XML Import Error:", error);
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: "The selected file could not be parsed. Please check the file format.",
        });
      } finally {
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsText(file);
  };

  const handleExportXml = () => {
    trackCanvasEvent('export_xml');
    let xmlContent = `<swot_analysis>\n`;
    xmlContent += `  <title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>\n`;
    xmlContent += `  <creator>${creator.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</creator>\n`;

    for (const [key, items] of Object.entries(data)) {
        xmlContent += `  <${key}>\n`;
        items.forEach(item => {
            xmlContent += `    <item id="${item.id}" score="${item.score}">${item.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</item>\n`;
        });
        xmlContent += `  </${key}>\n`;
    }
    xmlContent += `</swot_analysis>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swot-analysis.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    trackCanvasEvent('export_csv');
    let csvContent = "Category,Content,Score\n";
    for (const [key, items] of Object.entries(data)) {
        items.forEach(item => {
            const content = `"${item.content.replace(/"/g, '""')}"`;
            csvContent += `${key},${content},${item.score}\n`;
        });
    }

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "swot-analysis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExportPng = () => {
    trackCanvasEvent('export_png');
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
        link.download = 'swot-analysis.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };
  
  const calculateScores = (items: ScoredModelItem[]) => {
    if (items.length === 0) {
      return { total: 0, average: 0 };
    }
    const total = items.reduce((sum, item) => sum + item.score, 0);
    const average = total / items.length;
    return { total, average };
  };

  const chartData = useMemo(() => {
    return columns.map(column => {
        const { average } = calculateScores(data[column.key]);
        return {
            subject: column.title,
            value: average,
            fullMark: 5,
        };
    });
  }, [data, columns]);

  const countTotalItems = (swotData: SwotModel) => {
    return Object.values(swotData).reduce((sum, array) => sum + array.length, 0);
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
            <Button variant="outline" onClick={() => { setIsHistoryOpen(true); trackCanvasEvent('open_history'); }}>
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
              Saved History for "SWOT Analysis"
            </DialogTitle>
            <DialogDescription>
              Load a past version of your SWOT analysis.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-80 pr-6">
            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((entry) => (
                  <div key={entry.timestamp} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{entry.title || "Untitled Analysis"}</p>
                      <p className="text-sm text-muted-foreground">
                        Saved at {new Date(entry.timestamp).toLocaleString()} with {countTotalItems(entry.data)} items
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => handleLoadFromHistory(entry)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Load
                      </Button>
                       <Button variant="outline" onClick={() => { trackCanvasEvent('export_xml_from_history'); handleExportXml(); }}>
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
          
          <DialogFooterComponent className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Your data is saved in your browser's local storage.
              </p>
          </DialogFooterComponent>
        </DialogContent>
      </Dialog>
      
      <div id="png-export-area">
        <div ref={canvasRef} className="printable-canvas bg-background p-4 rounded-lg">
            <div className="mb-4 space-y-2">
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Analysis Title"
                className="text-2xl font-bold h-auto p-2 border-0 shadow-none focus-visible:ring-0"
              />
              <Input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="Author Name"
                className="text-muted-foreground border-0 shadow-none focus-visible:ring-0 p-2 h-auto"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2 items-start">
            {columns.map(column => {
                const { total, average } = calculateScores(data[column.key]);
                return (
                <Card key={column.key} className={`${column.bg} flex flex-col min-h-[300px]`}>
                    <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium font-headline">{column.title}</CardTitle>
                        <Button size="icon" variant="ghost" className="h-8 w-8 no-print" onClick={() => handleAddItem(column.key)}>
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
                        className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing"
                        >
                        <div className="flex items-start gap-2">
                            <GripVertical className="h-5 w-5 mt-1 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground no-print" />
                            <div className="flex-grow">
                                {editingItemId === item.id ? (
                                    <Textarea
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    onBlur={() => handleSaveEdit(column.key)}
                                    autoFocus
                                    className="w-full text-sm resize-none mb-2"
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSaveEdit(column.key); } }}
                                    />
                                ) : (
                                    <p onClick={() => startEditing(item)} className="text-sm w-full min-h-[24px] mb-2">
                                    {item.content}
                                    </p>
                                )}
                                <Select
                                    value={item.score.toString()}
                                    onValueChange={(value) => handleScoreChange(column.key, item.id, value)}
                                    >
                                    <SelectTrigger className="h-8 text-sm">
                                        <SelectValue placeholder="Set score" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(scoreLabels).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 shrink-0 no-print"
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
                    <CardFooter className="flex-col items-start pt-4 border-t">
                    <p className="font-bold">Total Score: {total}</p>
                    <p className="text-sm text-muted-foreground">
                        Average Score: {average.toFixed(2)}
                    </p>
                    </CardFooter>
                </Card>
                )
            })}
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>SWOT Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            value: { label: "Average Score", color: "hsl(var(--primary))"},
                        }}
                        className="h-[400px] w-full"
                    >
                        <RadarChart data={chartData}>
                            <ChartTooltip
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <Radar
                                dataKey="value"
                                fill="var(--color-value)"
                                fillOpacity={0.6}
                                stroke="var(--color-value)"
                            />
                        </RadarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
