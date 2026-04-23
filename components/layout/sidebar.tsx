"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Produits" },
  { href: "/content", label: "Contenu" },
  { href: "/listings", label: "Listings" },
  { href: "/angles", label: "Angles" },
  { href: "/visuals", label: "Briefs visuels" },
  { href: "/queue", label: "Queue" },
  { href: "/library", label: "Bibliotheque" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-xs rounded-[28px] border border-white/70 bg-[#2b241d] p-6 text-paper shadow-panel">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d8c7b1]">
          Felicidade
        </p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight">
          Command Center
        </h1>
        <p className="mt-3 text-sm text-[#c7b59d]">
          Cockpit marketing Amazon bijoux pierres naturelles.
        </p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-2xl px-4 py-3 text-sm text-[#efe2d2] transition hover:bg-white/10",
              pathname === item.href && "bg-white/10",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
