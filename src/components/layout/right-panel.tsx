import { useState } from "react";
import { ChevronDown, ChevronLeft, BookOpen, Check, Heart } from "lucide-react";
import { useSettings, ARABIC_FONTS, TRANSLATIONS, type ArabicFont } from "@/lib/settings";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Tab = "Translation" | "Reading";

export function RightPanel() {
  const [tab, setTab] = useState<Tab>("Translation");
  const [openReading, setOpenReading] = useState(true);
  const [openFont, setOpenFont] = useState(false);
  const [fontSubview, setFontSubview] = useState(false);

  const settings = useSettings();

  if (fontSubview) {
    return <FontFaceSubview onBack={() => setFontSubview(false)} />;
  }

  return (
    <div className="flex flex-col h-full w-full bg-sidebar p-3 gap-3">
      <div className="grid grid-cols-2 rounded-full bg-muted p-1 text-sm">
        {(["Translation", "Reading"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "py-1.5 rounded-full transition-colors",
              tab === t ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin space-y-3 pr-1">
        <Section
          open={openReading}
          onToggle={() => setOpenReading((v) => !v)}
          icon={<BookOpen className="size-4" />}
          title="Reading Settings"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">Translation</label>
              <DropdownMenu>
                <DropdownMenuTrigger className="mt-1.5 w-full flex items-center justify-between px-3 h-10 rounded-lg bg-muted text-sm hover:bg-accent transition-colors">
                  <span className="truncate">
                    {TRANSLATIONS.find((t) => t.id === settings.translationId)?.label ?? "Saheeh International"}
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({TRANSLATIONS.find((t) => t.id === settings.translationId)?.language ?? "English"})
                    </span>
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 max-h-80 overflow-y-auto">
                  {TRANSLATIONS.map((t) => (
                    <DropdownMenuItem
                      key={t.id}
                      onClick={() => settings.setTranslation(t.id)}
                      className="flex items-center justify-between"
                    >
                      <span className="flex flex-col">
                        <span className="text-sm">{t.label}</span>
                        <span className="text-xs text-muted-foreground">{t.language}</span>
                      </span>
                      {t.id === settings.translationId && <Check className="size-4 text-primary" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ToggleRow label="Show by words" checked={settings.showByWord} onChange={settings.setShowByWord} />
            <ToggleRow label="Tajweed" checked={settings.tajweed} onChange={settings.setTajweed} />
          </div>
        </Section>

        <Section
          open={openFont}
          onToggle={() => setOpenFont((v) => !v)}
          icon={<TIcon />}
          title="Font Settings"
          activeTitle
        >
          <div className="space-y-5">
            <SliderRow
              label="Arabic Font Size"
              value={settings.arabicFontSize}
              min={20}
              max={72}
              onChange={settings.setArabicFontSize}
            />
            <SliderRow
              label="Translation Font Size"
              value={settings.translationFontSize}
              min={12}
              max={28}
              onChange={settings.setTranslationFontSize}
            />
            <div>
              <label className="text-xs text-muted-foreground">Arabic Font Face</label>
              <button
                onClick={() => setFontSubview(true)}
                className="mt-1.5 w-full flex items-center justify-between px-3 h-10 rounded-lg bg-muted text-sm hover:bg-accent transition-colors"
              >
                {settings.arabicFont}
                <ChevronLeft className="size-4 rotate-180 text-muted-foreground" />
              </button>
            </div>
          </div>
        </Section>

        <SupportCard />
      </div>
    </div>
  );
}

function FontFaceSubview({ onBack }: { onBack: () => void }) {
  const arabicFont = useSettings((s) => s.arabicFont);
  const setArabicFont = useSettings((s) => s.setArabicFont);
  const [script, setScript] = useState<"uthmani" | "indopak">("uthmani");
  const list = ARABIC_FONTS.filter((f) => f.script === script);

  return (
    <div className="flex flex-col h-full w-full bg-sidebar p-3 gap-3">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
      >
        <ChevronLeft className="size-4" /> Select Font Face
      </button>
      <div className="grid grid-cols-2 rounded-full bg-muted p-1 text-sm">
        {(["uthmani", "indopak"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setScript(t)}
            className={cn(
              "py-1.5 rounded-full transition-colors capitalize",
              script === t ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto scroll-thin space-y-1">
        {list.map((f) => {
          const selected = f.value === arabicFont;
          return (
            <button
              key={f.value}
              onClick={() => setArabicFont(f.value as ArabicFont)}
              className={cn(
                "w-full text-left px-3 h-11 rounded-lg flex items-center justify-between text-sm hover:bg-accent transition-colors",
                selected && "bg-surah-active text-primary",
              )}
            >
              <span>{f.label}</span>
              {selected && <Check className="size-4" />}
            </button>
          );
        })}
        {list.length === 0 && (
          <div className="text-xs text-muted-foreground text-center py-6">No fonts in this script.</div>
        )}
      </div>
    </div>
  );
}

function Section({
  open,
  onToggle,
  icon,
  title,
  activeTitle,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  activeTitle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-card/40 border border-border/60 p-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className={cn("size-7 rounded-md flex items-center justify-center", activeTitle ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{icon}</span>
          <span className={cn("font-semibold text-sm", activeTitle && open && "text-primary")}>{title}</span>
        </div>
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function TIcon() {
  return <span className="font-bold text-sm">T</span>;
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-xs text-primary font-semibold tabular-nums">{value}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={1} onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}

function SupportCard() {
  return (
    <div className="rounded-xl bg-card border border-border p-4 space-y-3">
      <h3 className="font-semibold">Help spread the knowledge of Islam</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
      </p>
      <Button className="w-full rounded-lg gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
        Support Us <Heart className="size-4 fill-current" />
      </Button>
    </div>
  );
}
