import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeTheme } from "@/types/resume";
import { Palette } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: ResumeTheme;
  onThemeChange: (theme: ResumeTheme) => void;
}

const themes: { value: ResumeTheme; label: string; description: string }[] = [
  {
    value: 'modern',
    label: 'Modern',
    description: 'Clean design with accent colors'
  },
  {
    value: 'classic',
    label: 'Classic',
    description: 'Traditional professional layout'
  },
  {
    value: 'minimalist',
    label: 'Minimalist',
    description: 'Simple and elegant design'
  }
];

export default function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  const currentTheme = themes.find(theme => theme.value === selectedTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Palette className="h-4 w-4" />
          {currentTheme?.label} Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {themes.map((theme) => (
          <DropdownMenuItem 
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            className="flex flex-col items-start gap-1 p-3"
          >
            <div className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  theme.value === selectedTheme ? 'bg-primary' : 'bg-muted'
                }`} 
              />
              <span className="font-medium">{theme.label}</span>
            </div>
            <span className="text-sm text-muted-foreground">{theme.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}