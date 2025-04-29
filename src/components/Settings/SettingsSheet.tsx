
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from "@/components/ui/switch";

interface SettingsSheetProps {
  children: React.ReactNode;
}

export function SettingsSheet({ children }: SettingsSheetProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <div className="flex items-center justify-between">
            <label htmlFor="dark-mode" className="text-sm font-medium">
              Dark Mode
            </label>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
