
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function HelpSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle size={16} />
          <span className="hidden sm:inline">Help</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Help & Support</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <section>
            <h3 className="font-medium mb-2">Quick Start Guide</h3>
            <p className="text-sm text-muted-foreground">
              This dashboard provides comprehensive warranty analysis for RV components and claims.
              Use the sidebar to navigate between different analysis views.
            </p>
          </section>
          <section>
            <h3 className="font-medium mb-2">Navigation</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Dashboard - Overview of key metrics</li>
              <li>• Root Cause Analysis - Identify common issues</li>
              <li>• Predictive Analytics - Future trends and forecasts</li>
              <li>• Dealer Performance - Dealer-specific metrics</li>
              <li>• Customer Impact - Regional and demographic data</li>
              <li>• Financial Impact - Cost analysis and projections</li>
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
