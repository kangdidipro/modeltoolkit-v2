
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import AdBanner from "@/components/ad-banner"

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
                        1. Eisenhower Matrix
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
                      2. SWOT Analysis
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
                      3. Pareto Principle (80/20)
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
                          4. Business Model Canvas
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
                          5. Maslow's Hierarchy
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
                          6. Johari Window
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
                      7. Boston Matrix
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
                      8. Porter's Five Forces
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/aida-model">
                    <SidebarMenuButton
                      isActive={isActive("/models/aida-model")}
                      icon={<LayoutGrid />}
                      tooltip="AIDA Model"
                    >
                      9. AIDA Model
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
                      10. Tuckman's Stages
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
                      11. McKinsey 7S Framework
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/adkar-model">
                    <SidebarMenuButton
                      isActive={isActive("/models/adkar-model")}
                      icon={<LayoutGrid />}
                      tooltip="ADKAR Model"
                    >
                      12. ADKAR Model
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
                      13. Gantt Chart
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/models/fishbone-diagram">
                    <SidebarMenuButton
                      isActive={isActive("/models/fishbone-diagram")}
                      icon={<LayoutGrid />}
                      tooltip="Fishbone Diagram"
                    >
                      14. Fishbone Diagram
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
                      15. RACI Matrix
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
                      16. SCAMPER Model
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
                      17. Diffusion of Innovations
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
                      18. Flow Model
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
                      19. Change Management
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
                      20. Communication Model
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarGroup>
              
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
              <div className="p-2">
                <AdBanner />
              </div>
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
