
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
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import {
  LayoutGrid
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { modelInfo } from "@/lib/models"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"

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
                {Object.entries(modelInfo).map(([id, { name }]) => (
                  <SidebarMenuItem key={id}>
                    <Link href={`/models/${id}`}>
                      <SidebarMenuButton
                        isActive={isActive(`/models/${id}`)}
                        icon={<LayoutGrid />}
                        tooltip={name}
                      >
                        {name}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarGroup>
            </SidebarMenu>
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
