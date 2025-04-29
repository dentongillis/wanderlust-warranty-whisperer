
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HelpSheetProps {
  children: React.ReactNode;
}

export function HelpSheet({ children }: HelpSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Help & Support</SheetTitle>
          <SheetDescription>
            Get help with using the RV Warranty Analysis Dashboard
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <h3 className="text-base font-medium mb-2">Common Questions</h3>
          <ul className="space-y-2 text-sm">
            <li className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
              How do I filter data by date range?
            </li>
            <li className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
              Can I export reports to PDF?
            </li>
            <li className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
              How to compare warranty claims across different dealers?
            </li>
            <li className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
              Setting up automated reports
            </li>
          </ul>
          
          <div className="mt-6">
            <h3 className="text-base font-medium mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600">
              Email: support@rv-analytics.com<br />
              Phone: (555) 123-4567<br />
              Hours: Monday-Friday, 9am-5pm EST
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
