import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await fetch("https://sai.sharedllm.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-oss:120b",
        messages: [
          {
            role: "system",
            content:
              "You are PriceRadar AI, an expert AI pricing analyst for e-commerce. You provide detailed, data-driven competitive pricing analysis, dynamic pricing strategies, market reports, and actionable recommendations. Always be specific with numbers, percentages, and price points. Use clear markdown formatting with headers, bullet points, and tables where appropriate.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LLM API error:", response.status, errorText);
      return NextResponse.json(
        { error: `AI service error (${response.status})` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({ response: message });
  } catch (error: unknown) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
