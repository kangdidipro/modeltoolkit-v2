
"use client"

import { useState, useMemo, useRef, type DragEvent, useEffect } from "react"
import { initialBusinessModelCanvasData, type BusinessModelCanvasModel, type ModelItem } from "@/lib/models"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, GripVertical, Save, History, Upload, FileDown, RefreshCw, Image as ImageIcon, Link2, Link2Off } from "lucide-react"
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
import { cn } from "@/lib/utils"

type ColumnKeys = keyof BusinessModelCanvasModel;
const LOCAL_STORAGE_KEY = 'business-model-canvas-history';

type Connection = {
  from: string;
  to: string;
}
type HistoryEntry = {
  timestamp: number;
  data: BusinessModelCanvasModel;
  connections: Connection[];
};

export default function BusinessModelCanvas() {
  const [data, setData] = useState<BusinessModelCanvasModel>(initialBusinessModelCanvasData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [startConnectionPoint, setStartConnectionPoint] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [linePositions, setLinePositions] = useState<any[]>([]);
  const itemRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

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
          setConnections(parsedHistory[0].connections || []);
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
  
  useEffect(() => {
    const calculateLinePositions = () => {
      if (!canvasRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      const newPositions = connections.map(conn => {
        const fromEl = itemRefs.current[conn.from];
        const toEl = itemRefs.current[conn.to];
        
        if (fromEl && toEl) {
          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();
          
          return {
            x1: fromRect.left + fromRect.width / 2 - canvasRect.left,
            y1: fromRect.top + fromRect.height / 2 - canvasRect.top,
            x2: toRect.left + toRect.width / 2 - canvasRect.left,
            y2: toRect.top + toRect.height / 2 - canvasRect.top,
            id: `${conn.from}-${conn.to}`
          };
        }
        return null;
      }).filter(p => p !== null);
      
      setLinePositions(newPositions);
    };

    calculateLinePositions();
    window.addEventListener('resize', calculateLinePositions);
    
    // Recalculate on data change
    const timeoutId = setTimeout(calculateLinePositions, 50);

    return () => {
      window.removeEventListener('resize', calculateLinePositions);
      clearTimeout(timeoutId);
    };
  }, [connections, data]);


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
    setConnections(prev => prev.filter(c => c.from !== itemId && c.to !== itemId));
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
  
  const handleItemClick = (itemId: string) => {
    if (!isConnectMode) return;
    
    if (!startConnectionPoint) {
      setStartConnectionPoint(itemId);
    } else {
      if (startConnectionPoint === itemId) {
        setStartConnectionPoint(null); // Cancel connection
        return;
      }
      
      const newConnection = { from: startConnectionPoint, to: itemId };
      const existingConnection = connections.find(c => (c.from === newConnection.from && c.to === newConnection.to) || (c.from === newConnection.to && c.to === newConnection.from));

      if (existingConnection) {
        // Remove existing connection
        setConnections(prev => prev.filter(c => c !== existingConnection));
      } else {
        // Add new connection
        setConnections(prev => [...prev, newConnection]);
      }
      setStartConnectionPoint(null);
    }
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
        connections: connections,
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
    setConnections(entry.connections || []);
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

        const newCanvasData: BusinessModelCanvasModel = {
            keyPartners: [], keyActivities: [], keyResources: [],
            valuePropositions: [], customerRelationships: [], channels: [],
            customerSegments: [], costStructure: [], revenueStreams: []
        };
        
        const newConnections: Connection[] = [];
        
        Object.keys(newCanvasData).forEach(key => {
            const categoryElement = xmlDoc.getElementsByTagName(key)[0];
            if (categoryElement) {
                const items = Array.from(categoryElement.getElementsByTagName('item')).map(itemEl => ({
                    id: itemEl.getAttribute('id') || `imported-${Date.now()}-${Math.random()}`,
                    content: itemEl.textContent || "",
                }));
                newCanvasData[key as keyof BusinessModelCanvasModel] = items;
            }
        });

        const connectionsElement = xmlDoc.getElementsByTagName('connections')[0];
        if (connectionsElement) {
          Array.from(connectionsElement.getElementsByTagName('connection')).forEach(connEl => {
            const from = connEl.getAttribute('from');
            const to = connEl.getAttribute('to');
            if(from && to) {
              newConnections.push({ from, to });
            }
          })
        }

        setData(newCanvasData);
        setConnections(newConnections);
        toast({
          title: "Import Successful",
          description: "Your Business Model Canvas has been loaded from the XML file.",
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
    let xmlContent = `<business_model_canvas>\n`;
    for (const [key, items] of Object.entries(data)) {
        xmlContent += `  <${key}>\n`;
        items.forEach(item => {
            xmlContent += `    <item id="${item.id}">${item.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</item>\n`;
        });
        xmlContent += `  </${key}>\n`;
    }
    xmlContent += `  <connections>\n`;
    connections.forEach(conn => {
        xmlContent += `    <connection from="${conn.from}" to="${conn.to}" />\n`;
    });
    xmlContent += `  </connections>\n`;
    xmlContent += `</business_model_canvas>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-model-canvas.xml';
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
    link.setAttribute("download", "business-model-canvas.csv");
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
        link.download = 'business-model-canvas.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };
  
  const countTotalItems = (canvasData: BusinessModelCanvasModel) => {
    return Object.values(canvasData).reduce((sum, array) => sum + array.length, 0);
  }

  return (
    <TooltipProvider>
      <div className="canvas-controls mb-4 flex flex-wrap gap-2">
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
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={isConnectMode ? "secondary" : "outline"} onClick={() => setIsConnectMode(!isConnectMode)}>
                    {isConnectMode ? <Link2Off className="mr-2 h-4 w-4" /> : <Link2 className="mr-2 h-4 w-4" />}
                    {isConnectMode ? 'Connecting...' : 'Connect Items'}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Toggle connection mode to link items.</p>
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
                      <p className="text-sm text-muted-foreground">{countTotalItems(entry.data)} items, {entry.connections?.length || 0} connections</p>
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
      
      <div className="relative">
        <div 
          ref={canvasRef}
          className={cn("printable-canvas grid gap-4 bg-background p-4 rounded-lg relative", isConnectMode && "cursor-crosshair")}
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
                   <Button size="icon" variant="ghost" className="h-7 w-7 no-print" onClick={() => handleAddItem(column.key)}>
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
                    ref={el => itemRefs.current[item.id] = el}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, column.key)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                        "group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-lg p-2 shadow-sm transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing",
                        isConnectMode && "cursor-crosshair hover:bg-primary/20",
                        startConnectionPoint === item.id && "ring-2 ring-primary ring-offset-2"
                    )}
                  >
                    <div className="flex items-start gap-1">
                      <GripVertical className="h-5 w-5 mt-0.5 text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground no-print" />
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
                        <p onClick={(e) => { if(!isConnectMode) startEditing(item); else e.stopPropagation(); }} className={cn("flex-grow text-sm w-full min-h-[20px]", !isConnectMode && "cursor-text")}>
                          {item.content}
                        </p>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0 no-print"
                        onClick={(e) => { e.stopPropagation(); handleDeleteItem(column.key, item.id); }}
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
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          {linePositions.map(pos => (
            <line key={pos.id} x1={pos.x1} y1={pos.y1} x2={pos.x2} y2={pos.y2} stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
          ))}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
            </marker>
          </defs>
        </svg>
      </div>
    </TooltipProvider>
  )
}
