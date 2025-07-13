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
                <Link href="/models/swot" legacyBehavior passHref>
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
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Business Model Canvas
                  </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton
                    icon={<LayoutGrid />}
                    disabled
                    tooltip="Coming Soon"
                  >
                    Eisenhower Matrix
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Resources</SidebarGroupLabel>
              <SidebarMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive("/blog")}
                    icon={<Newspaper />}
                    tooltip="Blog"
                  >
                    Blog
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/feedback" legacyBehavior passHref>
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
