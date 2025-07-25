

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
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  LayoutGrid,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { modelInfo, categories } from "@/lib/models"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"

const defaultOpenCategories = categories.map(category => category.name);

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  const { setOpenMobile } = useSidebar();

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  
  const handleLinkClick = () => {
    setOpenMobile(false);
  }

  // Pass handleLinkClick to children
  return React.cloneElement(children as React.ReactElement, { handleLinkClick });
}

function AppLayoutContent({ children, handleLinkClick }: { children: React.ReactNode, handleLinkClick: () => void }) {
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
    <>
      <Sidebar className="no-print">
        <SidebarHeader>
          <Link href="/models" className="flex items-center gap-2 p-2" onClick={handleLinkClick}>
            <Logo size="md" />
            <h1 className="text-xl font-headline font-semibold">Model Toolkit</h1>
          </Link>
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
                          {category.models.filter(({id}) => modelInfo[id]).map(({id}) => {
                              const info = modelInfo[id];
                              const Icon = info.icon;
                              return (
                                <SidebarMenuItem key={id}>
                                    <Link href={`/models/${id}`} className="block" onClick={handleLinkClick}>
                                        <SidebarMenuButton
                                            isActive={isActive(`/models/${id}`)}
                                            icon={<Icon />}
                                            className="h-8 justify-between"
                                        >
                                            <span className="truncate">{info.name}</span>
                                            {info.ai && (
                                                <Wand2 className="h-4 w-4 text-primary shrink-0" />
                                            )}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                              )
                          })}
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
            <div className="p-4 md:p-6 printable-area">
              <div className="md:hidden flex items-center justify-between mb-4 no-print">
                <div className="flex items-center gap-2">
                  <SidebarTrigger>
                      <Button variant="ghost" size="icon">
                        <LayoutGrid />
                      </Button>
                  </SidebarTrigger>
                  <Link href="/models" className="flex items-center gap-2">
                    <Logo size="sm" />
                    <h1 className="text-lg font-headline font-semibold">Model Toolkit</h1>
                  </Link>
                </div>
              </div>
              {children}
            </div>
          </main>
          <Footer timestamp={timestamp} className="no-print"/>
        </div>
      </SidebarInset>
    </>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ClientOnly>
        <AppLayoutContent>{children}</AppLayoutContent>
      </ClientOnly>
    </SidebarProvider>
  )
}
