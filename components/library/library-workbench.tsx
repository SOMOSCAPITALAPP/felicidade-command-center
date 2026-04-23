"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GeneratedContent, ListingVersion, VisualBrief } from "@/lib/types";

export function LibraryWorkbench() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [listingVersions, setListingVersions] = useState<ListingVersion[]>([]);
  const [visualBriefs, setVisualBriefs] = useState<VisualBrief[]>([]);

  useEffect(() => {
    fetch("/api/library")
      .then((response) => response.json())
      .then((data) => {
        setGeneratedContent(data.generatedContent ?? []);
        setListingVersions(data.listingVersions ?? []);
        setVisualBriefs(data.visualBriefs ?? []);
      });
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h4 className="text-lg font-semibold">Bibliotheque active</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white/75 p-4 text-sm text-muted">
            {generatedContent.length} contenus sociaux
          </div>
          <div className="rounded-2xl border border-line bg-white/75 p-4 text-sm text-muted">
            {listingVersions.length} versions de listing
          </div>
          <div className="rounded-2xl border border-line bg-white/75 p-4 text-sm text-muted">
            {visualBriefs.length} briefs visuels
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {generatedContent.slice(0, 3).map((item) => (
          <Card key={item.id} className="p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              contenu {item.platform}
            </p>
            <p className="mt-2 font-medium">{item.hook}</p>
            <p className="mt-3 text-sm text-muted">{item.body}</p>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary">Dupliquer</Button>
              <Button>Reutiliser</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
