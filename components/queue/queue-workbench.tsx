"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { QueueItem } from "@/lib/types";
import { formatDateTime } from "@/lib/utils/format";

export function QueueWorkbench() {
  const [items, setItems] = useState<QueueItem[]>([]);

  useEffect(() => {
    fetch("/api/publishing-queue")
      .then((response) => response.json())
      .then((data) => setItems(data.items ?? []));
  }, []);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="overflow-hidden">
        <div className="border-b border-line p-5">
          <h4 className="text-lg font-semibold">File de publication</h4>
          <p className="mt-2 text-sm text-muted">
            Chaque contenu envoye depuis le generateur arrive ici avec son payload Make.
          </p>
        </div>
        <div className="space-y-3 p-5">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-line bg-white/75 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.make_payload.product_name}</p>
                <Badge>{item.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">
                {item.platform} · {formatDateTime(item.scheduled_at)}
              </p>
              <p className="mt-3 text-sm text-muted">{item.make_payload.content}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold">Payload Make</h4>
        <pre className="mt-4 overflow-x-auto rounded-2xl border border-line bg-[#221d18] p-4 text-xs leading-6 text-[#efe5d6]">
          {JSON.stringify(items[0]?.make_payload ?? {}, null, 2)}
        </pre>
      </Card>
    </div>
  );
}
