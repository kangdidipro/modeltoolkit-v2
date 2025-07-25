
"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialSwotData, type SwotModel, type ModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, GripVertical, Save, History, Upload, FileDown, RefreshCw, Printer, Lightbulb, Loader2, Wand2 } from "lucide-react"
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
import { analyzeModelCanvas, type AnalyzeModelCanvasOutput } from "@/ai/flows/model-canvas-analyzer"
import { generateSwotAnalysis } from "@/ai/flows/swot-generator-flow"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Input } from "./ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"


type ColumnKeys = keyof SwotModel;
const LOCAL_STORAGE_KEY = 'swot-model-history';

type HistoryEntry = {
  timestamp: number;
  data: SwotModel;
};

export default function SwotCanvas() {
  const [data, setData] = useState<SwotModel>(initialSwotData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAiAnalysisRunning, setIsAiAnalysisRunning] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AnalyzeModelCanvasOutput | null>(null);
  const [isAiResultOpen, setIsAiResultOpen] = useState(false);
  const [businessIdea, setBusinessIdea] = useState("A lemonade stand run by kids");
  const [businessInsights, setBusinessInsights] = useState("");

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

  const columns: { key: ColumnKeys; title: string; bg: string }[] = useMemo(() => [
    { key: "strengths", title: "Strengths", bg: "bg-green-100 dark:bg-green-900/40" },
    { key: "weaknesses", title: "Weaknesses", bg: "bg-red-100 dark:bg-red-900/40" },
    { key: "opportunities", title: "Opportunities", bg: "bg-blue-100 dark:bg-blue-900/40" },
    { key: "threats", title: "Threats", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
  ], []);
  
  const strategyCategories = [
    { title: "SO (Strengths-Opportunities) Strategies", key: "soStrategies", description: "How to use strengths to take advantage of opportunities." },
    { title: "ST (Strengths-Threats) Strategies", key: "stStrategies", description: "How to use strengths to avoid or mitigate threats." },
    { title: "WO (Weaknesses-Opportunities) Strategies", key: "woStrategies", description: "How to take advantage of opportunities to overcome weaknesses." },
    { title: "WT (Weaknesses-Threats) Strategies", key: "wtStrategies", description: "How to minimize weaknesses and avoid threats." },
  ] as const;


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
    let xmlContent = `<swot_analysis>\n`;
    for (const [key, items] of Object.entries(data)) {
        xmlContent += `  <${key}>\n`;
        items.forEach(item => {
            xmlContent += `    <item id="${item.id}">${item.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</item>\n`;
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
    link.setAttribute("download", "swot-analysis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  const countTotalItems = (swotData: SwotModel) => {
    return Object.values(swotData).reduce((sum, array) => sum + array.length, 0);
  }

  const handleAiAnalysis = async () => {
    setIsAiAnalysisRunning(true);
    setAiAnalysisResult(null);
    try {
      const result = await analyzeModelCanvas({
        modelType: "SWOT",
        modelCanvasState: JSON.stringify(data),
      });
      setAiAnalysisResult(result);
      setIsAiResultOpen(true);
    } catch (error) {
      console.error("AI Analysis failed", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "There was an error analyzing your SWOT canvas. Please try again.",
      });
    } finally {
      setIsAiAnalysisRunning(false);
    }
  };

  const handleGenerateSwot = async () => {
    if (!businessIdea) {
        toast({
            variant: 'destructive',
            title: 'Business Idea is empty',
            description: 'Please enter a business idea to generate the SWOT analysis.',
        });
        return;
    }
    setIsAiAnalysisRunning(true);
    setBusinessInsights("");
    try {
        const result = await generateSwotAnalysis({ businessIdea });
        const newSwotData: SwotModel = {
            strengths: result.strengths.map((s, i) => ({ id: `s-${i}-${Date.now()}`, content: s })),
            weaknesses: result.weaknesses.map((w, i) => ({ id: `w-${i}-${Date.now()}`, content: w })),
            opportunities: result.opportunities.map((o, i) => ({ id: `o-${i}-${Date.now()}`, content: o })),
            threats: result.threats.map((t, i) => ({ id: `t-${i}-${Date.now()}`, content: t })),
        };
        setData(newSwotData);
        setBusinessInsights(result.businessInsights);
        toast({
            title: 'SWOT Analysis Generated',
            description: 'The AI has successfully populated the SWOT canvas for your idea.',
        });
    } catch (error) {
        console.error("AI SWOT Generation failed", error);
        toast({
            variant: "destructive",
            title: "AI Generation Failed",
            description: "There was an error generating the SWOT analysis. Please try again.",
        });
    } finally {
        setIsAiAnalysisRunning(false);
    }
  }

  return (
    <TooltipProvider>
      <Card className="mb-6 bg-secondary/40 no-print">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Wand2 className="text-primary"/>
                AI Business Idea Analysis
            </CardTitle>
            <CardDescription>Enter your business idea, and let our AI generate a SWOT analysis and key insights for you.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                    placeholder="e.g., A subscription box for eco-friendly products"
                    value={businessIdea}
                    onChange={(e) => setBusinessIdea(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleGenerateSwot()}}
                    disabled={isAiAnalysisRunning}
                />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={handleGenerateSwot} disabled={isAiAnalysisRunning} className="bg-accent text-accent-foreground hover:bg-accent/90">
                            {isAiAnalysisRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                            Generate
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Enter a business idea and click to have the AI generate a full SWOT analysis.</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            {businessInsights && (
                <Alert className="mt-4">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Business Insights</AlertTitle>
                    <AlertDescription>
                        {businessInsights}
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
      </Card>


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
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Print or save your canvas as a PDF.</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" onClick={handleAiAnalysis} disabled={isAiAnalysisRunning || countTotalItems(data) === 0}>
              {isAiAnalysisRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
              Generate Strategic Insights
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Fill in the SWOT analysis, then click here. The AI will analyze the relationships between quadrants and suggest actionable strategies.
            </p>
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

      <Dialog open={isAiResultOpen} onOpenChange={setIsAiResultOpen}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-yellow-400" />
                    AI-Generated Strategic Insights
                </DialogTitle>
                <DialogDescription>
                    Here are actionable strategies based on your SWOT analysis, connecting your strengths and weaknesses with opportunities and threats.
                </DialogDescription>
            </DialogHeader>
            {aiAnalysisResult && (
                <ScrollArea className="max-h-[60vh] pr-4">
                    <Accordion type="multiple" defaultValue={["soStrategies", "stStrategies", "woStrategies", "wtStrategies"]} className="w-full">
                        {strategyCategories.map(category => (
                            (aiAnalysisResult[category.key] && aiAnalysisResult[category.key].length > 0) && (
                                <AccordionItem value={category.key} key={category.key}>
                                    <AccordionTrigger className="text-lg font-semibold">{category.title}</AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-2">
                                        <p className="text-sm text-muted-foreground">{category.description}</p>
                                        {aiAnalysisResult[category.key].map((suggestion, index) => (
                                            <Alert key={index}>
                                                <AlertTitle className="font-semibold">{suggestion.title}</AlertTitle>
                                                <AlertDescription>
                                                    {suggestion.description}
                                                </AlertDescription>
                                            </Alert>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        ))}
                    </Accordion>
                </ScrollArea>
            )}
            <DialogFooter>
                <Button onClick={() => setIsAiResultOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="printable-canvas grid gap-6 md:grid-cols-2 items-start bg-background p-4 rounded-lg">
        {columns.map(column => (
          <Card key={column.key} className={`${column.bg} flex flex-col min-h-[300px]`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium font-headline">{column.title}</CardTitle>
                 <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAddItem(column.key)}>
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
                    <GripVertical className="h-5 w-5 mt-1 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground" />
                    {editingItemId === item.id ? (
                      <Textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => handleSaveEdit(column.key)}
                        autoFocus
                        className="w-full text-sm resize-none"
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSaveEdit(column.key); } }}
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
    </TooltipProvider>
  );
}
