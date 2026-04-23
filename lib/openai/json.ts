import { getOpenAIClient } from "@/lib/openai/client";

function extractJsonPayload(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n");
    const body = lines.slice(1, -1).join("\n").trim();
    return body;
  }

  return trimmed;
}

function extractTextContent(
  content: string | Array<{ type?: string; text?: string }> | null | undefined,
) {
  if (!content) {
    return null;
  }

  if (typeof content === "string") {
    return content;
  }

  return content
    .map((item) => item.text ?? "")
    .join("")
    .trim();
}

export async function generateJsonObject<T>(input: {
  developerPrompt: string;
  userPrompt: string;
  temperature?: number;
  model?: string;
}): Promise<T | null> {
  const client = getOpenAIClient();

  if (!client) {
    return null;
  }

  const completion = await client.chat.completions.create({
    model: input.model ?? process.env.OPENAI_MODEL ?? "gpt-5-mini",
    messages: [
      {
        role: "developer",
        content: `${input.developerPrompt}\nRetourne exclusivement un JSON valide sans markdown.`,
      },
      {
        role: "user",
        content: input.userPrompt,
      },
    ],
  });

  const text = extractTextContent(completion.choices[0]?.message?.content as
    | string
    | Array<{ type?: string; text?: string }>
    | null);

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(extractJsonPayload(text)) as T;
  } catch {
    throw new Error(
      "OpenAI a repondu, mais pas dans un JSON exploitable. Verifie la cle API, le modele et le format de sortie.",
    );
  }
}
