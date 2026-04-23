import Link from "next/link";

import { Card } from "@/components/ui/card";

const actions = [
  { href: "/content", title: "Generer contenu", text: "Creer des variantes sociales en quelques secondes." },
  { href: "/listings", title: "Optimiser listing", text: "Retravailler titre, bullets et description Amazon." },
  { href: "/visuals", title: "Creer brief visuel", text: "Preparer un brief Canva directement exploitable." },
];

export function QuickActions() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <Card className="h-full p-5 transition hover:-translate-y-0.5">
            <h4 className="text-lg font-semibold">{action.title}</h4>
            <p className="mt-3 text-sm leading-6 text-muted">{action.text}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
