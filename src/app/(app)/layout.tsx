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
  BrainCircuit
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center gap-2 p-2">
            <BrainCircuit className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-headline font-semibold">Model Toolkit</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Models</SidebarGroupLabel>
              <SidebarMenuItem>
                 <Link href="/models/eisenhower-matrix">
                  <SidebarMenuButton
                      isActive={isActive("/models/eisenhower-matrix")}
                      icon={<LayoutGrid />}
                      tooltip="Eisenhower Matrix"
                    >
                      Eisenhower Matrix
                    </SidebarMenuButton>
                  </Link>
              </SidebarMenuItem>
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
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Boston Matrix
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Porter's Five Forces
                  </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    AIDA Model
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Tuckman's Stages
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    McKinsey 7S Framework
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    ADKAR Model
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Gantt Chart
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Fishbone Diagram
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    RACI Matrix
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    SCAMPER Model
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Diffusion of Innovations
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Flow Model
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Change Management
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Communication Model
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>From the Blog</SidebarGroupLabel>
              <SidebarMenuItem>
                <Link href="/blog">
                  <SidebarMenuButton
                    isActive={isActive("/blog")}
                    icon={<Newspaper />}
                    tooltip="Blog"
                  >
                    Key Features
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
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="min-h-screen">
          <div className="p-4 md:p-6">
            <div className="md:hidden flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 <BrainCircuit className="w-6 h-6 text-primary" />
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
  )
}
