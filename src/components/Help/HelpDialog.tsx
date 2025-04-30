
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HelpDialogProps {
  children: React.ReactNode;
}

export function HelpDialog({ children }: HelpDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Help & Support</DialogTitle>
          <DialogDescription>
            Get help with using the RV Warranty Analysis Dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <h3 className="text-base font-medium mb-2">Common Questions</h3>
          <ul className="space-y-2 text-sm">
            <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              How do I filter data by date range?
            </li>
            <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Can I export reports to PDF?
            </li>
            <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              How to compare warranty claims across different dealers?
            </li>
            <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Setting up automated reports
            </li>
          </ul>
          
          <div className="mt-6">
            <h3 className="text-base font-medium mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: support@rv-analytics.com<br />
              Phone: (555) 123-4567<br />
              Hours: Monday-Friday, 9am-5pm EST
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
