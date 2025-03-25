// components/layout/sidebar.tsx
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, Heart, Home, Bell, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  badge?: number;
}

function SidebarItem({ href, icon, title, badge }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
          isActive ? "bg-accent text-foreground" : "text-muted-foreground"
        )}
      >
        {icon}
        <span className="hidden md:inline-block">{title}</span>
        {badge ? (
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {badge}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-14 shrink-0 border-r md:w-64 lg:block">
      <div className="flex h-full flex-col gap-2 p-2">
        <div className="py-2">
          <SidebarItem
            href="/"
            icon={<Home className="h-5 w-5" />}
            title="Dashboard"
          />
        </div>
        <div className="py-2">
          <h4 className="mb-1 px-2 text-xs font-semibold text-muted-foreground md:block">
            Memory Assistant
          </h4>
          <div className="space-y-1">
            <SidebarItem
              href="/reminders"
              icon={<Clock className="h-5 w-5" />}
              title="Reminders"
              badge={3}
            />
            <SidebarItem
              href="/relations"
              icon={<User className="h-5 w-5" />}
              title="Relations"
            />
            <SidebarItem
              href="/alerts"
              icon={<AlertCircle className="h-5 w-5" />}
              title="Alerts"
              badge={1}
            />
          </div>
        </div>
        <div className="py-2">
          <h4 className="mb-1 px-2 text-xs font-semibold text-muted-foreground md:block">
            Emergency
          </h4>
          <div className="space-y-1">
            <SidebarItem
              href="/emergency"
              icon={<Bell className="h-5 w-5 text-red-500" />}
              title="Call for Help"
            />
          </div>
        </div>
        <div className="mt-auto py-2">
          <div className="space-y-1">
            <SidebarItem
              href="/settings"
              icon={<Heart className="h-5 w-5" />}
              title="Wellness"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}