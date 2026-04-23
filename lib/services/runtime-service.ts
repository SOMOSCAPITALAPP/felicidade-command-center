import { getOpenAIClient } from "@/lib/openai/client";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export function hasSupabase() {
  return Boolean(getSupabaseServerClient());
}

export function hasOpenAI() {
  return Boolean(getOpenAIClient());
}

export function getRuntimeMode() {
  return {
    supabase: hasSupabase(),
    openai: hasOpenAI(),
  };
}
