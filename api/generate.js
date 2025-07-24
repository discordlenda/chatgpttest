import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req) {
  const { prompt } = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })
  });

  const data = await res.json();
  return NextResponse.json({ response: data.choices[0].message.content });
}
