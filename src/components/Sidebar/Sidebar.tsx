
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
  MapIcon,
  LineChart,
  PieChart,
  Store
} from 'lucide-react';

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
        "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground transition-colors",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  
  return (
    <div 
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex items-center justify-center border-b border-sidebar-border">
        {collapsed ? (
          <TruckIcon size={28} className="text-sidebar-primary" />
        ) : (
          <div className="flex items-center gap-2">
            <TruckIcon size={24} className="text-sidebar-primary" />
            <h1 className="text-xl font-bold text-sidebar-foreground">RV Warranty</h1>
          </div>
        )}
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
          icon={LineChart} 
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
      
      <div className="mt-auto py-4 px-2 space-y-1 border-t border-sidebar-border">
        <SidebarLink href="/settings" icon={SettingsIcon} label="Settings" collapsed={collapsed} />
        <SidebarLink href="/help" icon={HelpCircleIcon} label="Help & Support" collapsed={collapsed} />
      </div>
    </div>
  );
};
