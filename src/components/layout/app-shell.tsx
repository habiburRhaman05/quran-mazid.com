"use client"
import React, { Suspense, useState } from "react";

import { IconRail } from "./icon-rail";
import { Header } from "./header";
import { SurahSidebar } from "./surah-sidebar";
import { RightPanel } from "./right-panel";
import { AudioPlayer } from "@/components/reader/audio-player";
import { SearchModal } from "@/components/search/search-modal";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useParams, useSearchParams } from "next/navigation";

export function AppShell({children}:{children:React.ReactNode}) {
  const [navOpen, setNavOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
 const params = useParams<{ id: string }>();

  const surahId = Number(params.id);


  
  return (
    <div className="flex h-full w-full overflow-hidden">
    
      <IconRail />
      <div className="flex-1">
        <Header onOpenMobileNav={()=> setNavOpen(true)}/>
      </div>

    
      {/* Mobile drawers */}
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="p-0 w-[320px] bg-sidebar border-sidebar-border">
          <SurahSidebar currentId={Number(surahId)} onNavigate={() => setNavOpen(false)} />
        </SheetContent>
      </Sheet>
      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent side="right" className="p-0 w-[340px] bg-sidebar border-sidebar-border">
          <RightPanel />
        </SheetContent>
      </Sheet>


      <button
        onClick={() => setPanelOpen(true)}
        className="xl:hidden fixed bottom-20 right-4 size-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-30"
        aria-label="Open settings"
      >
        <SettingsGear />
      </button>

      <SearchModal />
    </div>
  );
}

function SettingsGear() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
