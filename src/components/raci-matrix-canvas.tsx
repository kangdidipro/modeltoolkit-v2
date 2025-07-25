
"use client";

import { useState, useEffect, useRef } from "react";
import { initialRaciMatrixData, type RaciMatrixModel, type RaciTask, type RaciPerson, type RaciRole, type RaciAssignment } from "@/lib/models";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, History, Upload, FileDown, RefreshCw, GripVertical, Users, ListChecks, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LOCAL_STORAGE_KEY = 'raci-matrix-history';

type HistoryEntry = {
  timestamp: number;
  data: RaciMatrixModel;
};

export default function RaciMatrixCanvas() {
  const [data, setData] = useState<RaciMatrixModel>(initialRaciMatrixData);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
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
      toast({ variant: "destructive", title: "Error", description: "Could not load saved history." });
    }
  }, [toast]);

  const handleSave = () => {
    try {
      const newEntry: HistoryEntry = { timestamp: Date.now(), data };
      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      toast({ title: "Work Saved", description: "Your RACI Matrix has been saved to history." });
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
      toast({ variant: "destructive", title: "Error", description: "Could not save your work." });
    }
  };

  const handleLoadFromHistory = (entry: HistoryEntry) => {
    setData(entry.data);
    setIsHistoryOpen(false);
    toast({ title: "Work Loaded", description: `Loaded version from ${new Date(entry.timestamp).toLocaleString()}` });
  };
  
  const handleExportXml = () => {
    let xmlContent = `<raci_matrix>\n`;
    xmlContent += `  <people>\n`;
    data.people.forEach(p => {
        xmlContent += `    <person id="${p.id}">${p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</person>\n`;
    });
    xmlContent += `  </people>\n`;
    xmlContent += `  <tasks>\n`;
    data.tasks.forEach(t => {
        xmlContent += `    <task id="${t.id}" description="${t.description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}">\n`;
        t.assignments.forEach(a => {
            xmlContent += `      <assignment personId="${a.personId}" role="${a.role}" />\n`;
        });
        xmlContent += `    </task>\n`;
    });
    xmlContent += `  </tasks>\n`;
    xmlContent += `</raci_matrix>`;
    
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'raci-matrix.xml';
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleXmlImportClick = () => { fileInputRef.current?.click(); };
  
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

        const peopleElements = Array.from(xmlDoc.getElementsByTagName('person'));
        const people: RaciPerson[] = peopleElements.map(p => ({
          id: p.getAttribute('id') || `person-${Math.random()}`,
          name: p.textContent || 'Unnamed',
        }));

        const taskElements = Array.from(xmlDoc.getElementsByTagName('task'));
        const tasks: RaciTask[] = taskElements.map(t => {
          const assignmentElements = Array.from(t.getElementsByTagName('assignment'));
          const assignments: RaciAssignment[] = assignmentElements.map(a => ({
            personId: a.getAttribute('personId')!,
            role: a.getAttribute('role') as RaciRole,
          })).filter(a => a.personId && a.role);
          
          return {
            id: t.getAttribute('id') || `task-${Math.random()}`,
            description: t.getAttribute('description') || 'No description',
            assignments,
          };
        });

        setData({ people, tasks });
        toast({
          title: "Import Successful",
          description: "Your RACI Matrix has been loaded from the XML file.",
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
  
  const handleExportCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,Task,Person,Role\n";
    data.tasks.forEach(task => {
        task.assignments.forEach(assignment => {
            const person = data.people.find(p => p.id === assignment.personId);
            if (person) {
                const taskDesc = `"${task.description.replace(/"/g, '""')}"`;
                const personName = `"${person.name.replace(/"/g, '""')}"`;
                csvContent += `${taskDesc},${personName},${assignment.role}\n`;
            }
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "raci-matrix.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addPerson = () => {
    const newPerson: RaciPerson = { id: `person-${Date.now()}`, name: "New Person" };
    setData(prev => ({ ...prev, people: [...prev.people, newPerson] }));
  };
  
  const updatePerson = (id: string, name: string) => {
    setData(prev => ({ ...prev, people: prev.people.map(p => p.id === id ? { ...p, name } : p) }));
  };

  const deletePerson = (id: string) => {
    setData(prev => ({
      ...prev,
      people: prev.people.filter(p => p.id !== id),
      tasks: prev.tasks.map(t => ({
        ...t,
        assignments: t.assignments.filter(a => a.personId !== id)
      }))
    }));
  };

  const addTask = () => {
    const newTask: RaciTask = { id: `task-${Date.now()}`, description: "New Task", assignments: [] };
    setData(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
  };

  const updateTaskDescription = (id: string, description: string) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === id ? { ...t, description } : t) }));
  };

  const deleteTask = (id: string) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  const updateAssignment = (taskId: string, personId: string, role: RaciRole) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => {
        if (task.id === taskId) {
          const existingAssignment = task.assignments.find(a => a.personId === personId);
          if (existingAssignment) {
            return { ...task, assignments: task.assignments.map(a => a.personId === personId ? { ...a, role } : a) };
          } else {
            return { ...task, assignments: [...task.assignments, { personId, role }] };
          }
        }
        return task;
      })
    }));
  };
  
  const removeAssignment = (taskId: string, personId: string) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === taskId 
          ? { ...task, assignments: task.assignments.filter(a => a.personId !== personId) }
          : task
      )
    }));
  };

  const roleInfo: Record<RaciRole, { label: string, color: string, textColor: string }> = {
    R: { label: "Responsible", color: "bg-blue-200 dark:bg-blue-800", textColor: "text-blue-800 dark:text-blue-100" },
    A: { label: "Accountable", color: "bg-green-200 dark:bg-green-800", textColor: "text-green-800 dark:text-green-100" },
    C: { label: "Consulted", color: "bg-yellow-200 dark:bg-yellow-800", textColor: "text-yellow-800 dark:text-yellow-100" },
    I: { label: "Informed", color: "bg-purple-200 dark:bg-purple-800", textColor: "text-purple-800 dark:text-purple-100" },
  };

  return (
    <>
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
      </div>

      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Saved History</DialogTitle>
            <DialogDescription>Load a past version of your RACI Matrix.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-80 pr-6">
            <div className="space-y-4">
              {history.length > 0 ? history.map(entry => (
                <div key={entry.timestamp} className="p-4 border rounded-lg flex justify-between items-center">
                  <p>{new Date(entry.timestamp).toLocaleString()}</p>
                  <Button variant="secondary" onClick={() => handleLoadFromHistory(entry)}><RefreshCw className="mr-2 h-4 w-4" />Load</Button>
                </div>
              )) : <p>No saved history.</p>}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <div ref={canvasRef} className="printable-canvas bg-background p-4 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-blue-50 dark:bg-blue-900/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2"><Users /> People / Roles</CardTitle>
                <Button size="icon" variant="ghost" onClick={addPerson}><Plus /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.people.map(person => (
                <div key={person.id} className="flex items-center gap-2">
                  <Input defaultValue={person.name} onBlur={(e) => updatePerson(person.id, e.target.value)} className="flex-grow bg-card/80 dark:bg-card/50"/>
                  <Button size="icon" variant="ghost" onClick={() => deletePerson(person.id)}><Trash2 className="h-4 w-4"/></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2"><ListChecks /> Tasks</CardTitle>
                <Button size="icon" variant="ghost" onClick={addTask}><Plus /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.tasks.map(task => (
                <div key={task.id} className="p-4 border rounded-lg bg-card/80 dark:bg-card/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Input defaultValue={task.description} onBlur={e => updateTaskDescription(task.id, e.target.value)} className="text-base font-semibold flex-grow bg-background"/>
                    <Button size="icon" variant="ghost" onClick={() => deleteTask(task.id)}><Trash2 className="h-4 w-4"/></Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {data.people.map(person => {
                      const assignment = task.assignments.find(a => a.personId === person.id);
                      return (
                        <div key={`${task.id}-${person.id}`} className="flex items-center gap-2 p-2 rounded-md border bg-background">
                          <span className="text-sm font-medium flex-grow truncate">{person.name}</span>
                          <Select
                            value={assignment?.role}
                            onValueChange={(role) => {
                              if (role === 'none') {
                                removeAssignment(task.id, person.id);
                              } else {
                                updateAssignment(task.id, person.id, role as RaciRole);
                              }
                            }}
                          >
                            <SelectTrigger className={cn("w-20 h-8 font-bold", assignment ? roleInfo[assignment.role].color : '')}>
                              <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              {Object.entries(roleInfo).map(([key, {label, color, textColor}]) => (
                                <SelectItem key={key} value={key} className={cn("font-medium", textColor)}>{key}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
