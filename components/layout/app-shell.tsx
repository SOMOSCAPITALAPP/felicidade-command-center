import { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row">
        <Sidebar />
        <main className="flex-1 space-y-4">
          <Topbar />
          <section className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              {title}
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-ink">{title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              {description}
            </p>
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}
