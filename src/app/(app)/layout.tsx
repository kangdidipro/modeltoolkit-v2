

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarContent,
} from "@/components/ui/sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { modelInfo } from "@/lib/models"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"

const categories = [
    {
        name: "Strategic Planning & Business Analysis",
        models: [
            "swot", "pareto-principle", "business-model-canvas", "maslows-hierarchy",
            "boston-matrix", "porters-five-forces", "mckinsey-7s-framework"
        ]
    },
    {
        name: "Communication & Self-Awareness",
        models: ["johari-window", "communication-model"]
    },
    {
        name: "Project Management & Team Development",
        models: ["aida-model", "tuckmans-stages", "gantt-chart", "raci-matrix", "scamper-model"]
    },
    {
        name: "Change Management & Adoption",
        models: ["adkar-model", "change-management", "diffusion-of-innovations"]
    },
    {
        name: "Problem Solving & Diagrammatic Tools",
        models: ["fishbone-diagram", "flow-model"]
    }
];

const defaultOpenCategories = categories.map(category => category.name);

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [timestamp, setTimestamp] = React.useState("");

  React.useEffect(() => {
    setTimestamp(new Date().toLocaleString());
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
    <div className={cn(
        "flex items-center justify-center font-bold text-primary-foreground bg-primary",
        size === 'md' ? "w-8 h-8 text-sm rounded-lg" : "w-6 h-6 text-xs rounded-md"
    )}>
        MT
    </div>
  )
  
  return (
    <ClientOnly>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Logo size="md" />
              <h1 className="text-xl font-headline font-semibold">Model Toolkit</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Accordion type="multiple" className="w-full px-2" defaultValue={defaultOpenCategories}>
                {categories.map((category) => (
                    <AccordionItem value={category.name} key={category.name} className="border-b-0">
                        <AccordionTrigger className="justify-start text-sm font-semibold text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-accent/90 p-2 rounded-md hover:no-underline">
                            <div className="flex items-center gap-2">
                                {category.name}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-1">
                            <SidebarMenu className="pl-4 border-l ml-2">
                            {category.models.filter(id => modelInfo[id]).map((id) => (
                                <SidebarMenuItem key={id}>
                                    <Link href={`/models/${id}`} className="block">
                                        <SidebarMenuButton
                                            isActive={isActive(`/models/${id}`)}
                                            icon={<LayoutGrid />}
                                            className="h-8"
                                        >
                                            {modelInfo[id].name}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                            </SidebarMenu>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <div className="p-4 md:p-6">
                <div className="md:hidden flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Logo size="sm" />
                    <h1 className="text-lg font-headline font-semibold">Model Toolkit</h1>
                  </div>
                  <SidebarTrigger>
                      <Button variant="ghost" size="icon">
                        <LayoutGrid />
                      </Button>
                  </SidebarTrigger>
                </div>
                {children}
              </div>
            </main>
            <Footer timestamp={timestamp} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ClientOnly>
  )
}
