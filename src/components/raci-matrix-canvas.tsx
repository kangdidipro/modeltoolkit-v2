
"use client";

import { useState, useEffect, useRef } from "react";
import { initialRaciMatrixData, type RaciMatrixModel, type RaciTask, type RaciPerson, type RaciRole } from "@/lib/models";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, History, Upload, FileDown, RefreshCw, GripVertical, Users, ListChecks } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";


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

  const handleExport = (type: 'PNG' | 'PDF' | 'XML') => {
    toast({ title: 'Not available', description: `The ${type} export feature is coming soon!` });
  };

  const handleXmlImportClick = () => { fileInputRef.current?.click(); };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast({ title: "Import Not Available", description: "This feature is coming soon!" });
    if (event.target.files) event.target.value = '';
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
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
        <Button variant="outline" onClick={() => setIsHistoryOpen(true)}><History className="mr-2 h-4 w-4" /> History</Button>
        <input type="file" ref={fileInputRef} className="hidden" accept=".xml" onChange={handleFileChange} />
        <Button variant="outline" onClick={handleXmlImportClick}><Upload className="mr-2 h-4 w-4" /> Import XML</Button>
        <Button variant="outline" onClick={() => handleExport('XML')}><FileDown className="mr-2 h-4 w-4" /> Export XML</Button>
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
    </>
  );
}
