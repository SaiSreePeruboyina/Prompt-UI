
export async function POST(req) {
    const body = await req.json();
    const { prompt, language } = body;
    const apiKey = process.env.GROQ_API_KEY; 
  
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "user",
            content: `You are a pro ui code generator. Respond with ONLY raw  code.
             Do NOT include explanations or markdown.Make sure the generated code is as elaborate as possible so that a big webpage will be viewed
             ,pagesbe as professinal as real websites  only.For html codes give style.css in same file only dont give seperately .If language is react dont give external css files,Generate a simple React component as a self-contained JSX snippet like () => <button>Hello</button> without import
             for react language dont give any impot export etc give only jsx code,give only div elements ,not function app nothing 
             ,Make pages look colourful and vibrabt.Now generate a UI for this prompt: ${prompt} in ${language}`,
          },
        ],
      }),
    });  const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content || "";
    const cleanCode = content.replace(/```[\s\S]*?\n([\s\S]*?)```/, "$1").trim();
    console.log("Groq API response:", JSON.stringify(data, null, 2));
    return Response.json({ generatedCode: cleanCode });
  }

