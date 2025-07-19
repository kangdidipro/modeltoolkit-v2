
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter
} from "@/components/ui/sidebar"
import {
  LayoutGrid,
  Newspaper,
  MessageCircle,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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

const CollapsibleSidebarGroup = ({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) => (
    <Collapsible defaultOpen={true} asChild>
      <SidebarGroup className={cn("p-0 space-y-1", className)}>
        <CollapsibleTrigger asChild>
          <div className="flex justify-between items-center cursor-pointer p-2 hover:bg-sidebar-accent rounded-md">
            <SidebarGroupLabel className="p-0 text-sm">
              {label}
            </SidebarGroupLabel>
            <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <SidebarMenu className="px-2 pb-2">
            {children}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );

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
            <SidebarMenu>
              <CollapsibleSidebarGroup label="I. Strategic Planning & Business Analysis" className="bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                 <SidebarMenuItem>
                  <Link href="/models/swot">
                    <SidebarMenuButton
                      isActive={isActive("/models/swot")}
                      icon={<LayoutGrid />}
                      tooltip="SWOT Analysis"
                    >
                      SWOT Analysis
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/pareto-principle">
                    <SidebarMenuButton
                      isActive={isActive("/models/pareto-principle")}
                      icon={<LayoutGrid />}
                      tooltip="Pareto Principle (80/20)"
                    >
                      Pareto Principle (80/20)
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/business-model-canvas">
                      <SidebarMenuButton
                          isActive={isActive("/models/business-model-canvas")}
                          icon={<LayoutGrid />}
                          tooltip="Business Model Canvas"
                      >
                          Business Model Canvas
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/maslows-hierarchy">
                      <SidebarMenuButton
                          isActive={isActive("/models/maslows-hierarchy")}
                          icon={<LayoutGrid />}
                          tooltip="Maslow's Hierarchy"
                      >
                          Maslow's Hierarchy
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/models/boston-matrix">
                    <SidebarMenuButton
                      isActive={isActive("/models/boston-matrix")}
                      icon={<LayoutGrid />}
                      tooltip="Boston Matrix"
                    >
                      Boston Matrix
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/porters-five-forces">
                    <SidebarMenuButton
                      isActive={isActive("/models/porters-five-forces")}
                      icon={<LayoutGrid />}
                      tooltip="Porter's Five Forces"
                    >
                      Porter's Five Forces
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/models/mckinsey-7s-framework">
                    <SidebarMenuButton
                      isActive={isActive("/models/mckinsey-7s-framework")}
                      icon={<LayoutGrid />}
                      tooltip="McKinsey 7S Framework"
                    >
                      McKinsey 7S Framework
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </CollapsibleSidebarGroup>

              <CollapsibleSidebarGroup label="II. Communication & Self-Awareness" className="bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                 <SidebarMenuItem>
                  <Link href="/models/johari-window">
                      <SidebarMenuButton
                          isActive={isActive("/models/johari-window")}
                          icon={<LayoutGrid />}
                          tooltip="Johari Window"
                      >
                          Johari Window
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/models/communication-model">
                    <SidebarMenuButton
                      isActive={isActive("/models/communication-model")}
                      icon={<LayoutGrid />}
                      tooltip="Communication Model"
                    >
                      Communication Model
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </CollapsibleSidebarGroup>

              <CollapsibleSidebarGroup label="III. Project Management & Team Development" className="bg-green-100/50 dark:bg-green-900/30 rounded-lg">
                  <SidebarMenuItem>
                  <Link href="/models/aida-model">
                    <SidebarMenuButton
                      isActive={isActive("/models/aida-model")}
                      icon={<LayoutGrid />}
                      tooltip="AIDA Model"
                    >
                      AIDA Model
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/tuckmans-stages">
                    <SidebarMenuButton
                      isActive={isActive("/models/tuckmans-stages")}
                      icon={<LayoutGrid />}
                      tooltip="Tuckman's Stages"
                    >
                      Tuckman's Stages
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/models/gantt-chart">
                    <SidebarMenuButton
                      isActive={isActive("/models/gantt-chart")}
                      icon={<LayoutGrid />}
                      tooltip="Gantt Chart"
                    >
                      Gantt Chart
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/raci-matrix">
                    <SidebarMenuButton
                      isActive={isActive("/models/raci-matrix")}
                      icon={<LayoutGrid />}
                      tooltip="RACI Matrix"
                    >
                      RACI Matrix
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/scamper-model">
                    <SidebarMenuButton
                      isActive={isActive("/models/scamper-model")}
                      icon={<LayoutGrid />}
                      tooltip="SCAMPER Model"
                    >
                      SCAMPER Model
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </CollapsibleSidebarGroup>
              
              <CollapsibleSidebarGroup label="IV. Change Management & Adoption" className="bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
                <SidebarMenuItem>
                  <Link href="/models/adkar-model">
                    <SidebarMenuButton
                      isActive={isActive("/models/adkar-model")}
                      icon={<LayoutGrid />}
                      tooltip="ADKAR Model"
                    >
                      ADKAR Model
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/change-management">
                    <SidebarMenuButton
                      isActive={isActive("/models/change-management")}
                      icon={<LayoutGrid />}
                      tooltip="Change Management"
                    >
                      Change Management
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/models/diffusion-of-innovations">
                    <SidebarMenuButton
                      isActive={isActive("/models/diffusion-of-innovations")}
                      icon={<LayoutGrid />}
                      tooltip="Diffusion of Innovations"
                    >
                      Diffusion of Innovations
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </CollapsibleSidebarGroup>
              
              <CollapsibleSidebarGroup label="V. Problem Solving & Diagrammatic Tools" className="bg-orange-100/50 dark:bg-orange-900/30 rounded-lg">
                 <SidebarMenuItem>
                  <Link href="/models/fishbone-diagram">
                    <SidebarMenuButton
                      isActive={isActive("/models/fishbone-diagram")}
                      icon={<LayoutGrid />}
                      tooltip="Fishbone Diagram"
                    >
                      Fishbone Diagram
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/models/flow-model">
                    <SidebarMenuButton
                      isActive={isActive("/models/flow-model")}
                      icon={<LayoutGrid />}
                      tooltip="Flow Model"
                    >
                      Flow Model
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </CollapsibleSidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>About</SidebarGroupLabel>
                 <SidebarMenuItem>
                  <Link href="/blog">
                    <SidebarMenuButton
                      isActive={isActive("/blog")}
                      icon={<Newspaper />}
                      tooltip="Blog"
                    >
                      Blog
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/about">
                    <SidebarMenuButton
                      isActive={isActive("/about")}
                      icon={<Newspaper />}
                      tooltip="About"
                    >
                      About Model Toolkit
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <Link href="/feedback">
                      <SidebarMenuButton
                          isActive={isActive("/feedback")}
                          icon={<MessageCircle />}
                          tooltip="Feedback"
                      >
                          Give Feedback
                      </SidebarMenuButton>
                      </Link>
                  </SidebarMenuItem>
              </SidebarMenu>
              <div className="text-center text-xs text-muted-foreground p-2">
                Update timestamp: {timestamp}
              </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className="min-h-screen">
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
        </SidebarInset>
      </SidebarProvider>
    </ClientOnly>
  )
}
