
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  HomeIcon, 
  FileTextIcon, 
  BarChartIcon, 
  TruckIcon, 
  UsersIcon, 
  DollarSign, 
  SettingsIcon, 
  HelpCircleIcon,
  DatabaseIcon,
  PieChart,
  Store,
  MapPin
} from 'lucide-react';
import { SettingsDialog } from '../Settings/SettingsDialog';
import { HelpDialog } from '../Help/HelpDialog';

interface SidebarProps {
  collapsed: boolean;
}

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  href, 
  icon: Icon, 
  label, 
  collapsed,
  active = false
}) => {
  return (
    <Link 
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-white/80 transition-colors",
        active ? "bg-blue-700 text-white font-medium" : "hover:bg-blue-800/50 hover:text-white"
      )}
    >
      <Icon size={18} />
      {!collapsed && <span className="text-sm">{label}</span>}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  
  return (
    <div 
      className={cn(
        "bg-gradient-to-b from-gray-900 to-blue-900 h-screen flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="py-5 px-4 flex items-center border-b border-blue-800/50 h-16">
        <div className={cn(
          "flex items-center transition-all duration-300 ease-in-out",
          collapsed ? "justify-center w-full" : "justify-start"
        )}>
          {collapsed ? (
            <img 
              src="/lovable-uploads/c22163aa-a5f1-416a-b31f-da18245e6f39.png" 
              alt="RVAI Truck Logo" 
              className="h-8 w-auto transition-opacity duration-300"
            />
          ) : (
            <img 
              src="/lovable-uploads/5193ca6f-3c8a-4506-a10d-65db7d531983.png" 
              alt="RVAI Logo" 
              className="h-8 w-auto transition-opacity duration-300"
            />
          )}
        </div>
      </div>
      
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <SidebarLink 
          href="/" 
          icon={HomeIcon} 
          label="Dashboard" 
          collapsed={collapsed} 
          active={location.pathname === '/'} 
        />
        <SidebarLink 
          href="/root-cause" 
          icon={PieChart} 
          label="Root Cause Analysis" 
          collapsed={collapsed} 
          active={location.pathname === '/root-cause'} 
        />
        <SidebarLink 
          href="/predictive" 
          icon={BarChartIcon} 
          label="Predictive Analytics" 
          collapsed={collapsed} 
          active={location.pathname === '/predictive'} 
        />
        <SidebarLink 
          href="/dealer-performance" 
          icon={Store} 
          label="Dealer Performance" 
          collapsed={collapsed} 
          active={location.pathname === '/dealer-performance'} 
        />
        <SidebarLink 
          href="/regional-analysis" 
          icon={MapPin} 
          label="Regional Analysis" 
          collapsed={collapsed} 
          active={location.pathname === '/regional-analysis'} 
        />
        <SidebarLink 
          href="/customer-impact" 
          icon={UsersIcon} 
          label="Customer Impact" 
          collapsed={collapsed} 
          active={location.pathname === '/customer-impact'} 
        />
        <SidebarLink 
          href="/financial-impact" 
          icon={DollarSign} 
          label="Financial Impact" 
          collapsed={collapsed} 
          active={location.pathname === '/financial-impact'} 
        />
        <SidebarLink 
          href="/claims-report" 
          icon={DatabaseIcon} 
          label="Claims Report" 
          collapsed={collapsed} 
          active={location.pathname === '/claims-report'} 
        />
      </nav>
      
      <div className="mt-auto py-4 px-2 space-y-1 border-t border-blue-800/50">
        <SettingsDialog>
          <button className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/80 transition-colors",
            "hover:bg-blue-800/50 hover:text-white focus:outline-none",
            collapsed && "justify-center"
          )}>
            <SettingsIcon size={18} />
            {!collapsed && <span className="text-sm">Settings</span>}
          </button>
        </SettingsDialog>
        
        <HelpDialog>
          <button className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/80 transition-colors",
            "hover:bg-blue-800/50 hover:text-white focus:outline-none",
            collapsed && "justify-center"
          )}>
            <HelpCircleIcon size={18} />
            {!collapsed && <span className="text-sm">Help & Support</span>}
          </button>
        </HelpDialog>
      </div>
    </div>
  );
};
