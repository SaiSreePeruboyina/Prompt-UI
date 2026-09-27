
import { toast } from "@/hooks/use-toast";

export const generateWithOpenAI = async (prompt, apiKey) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using a modern model
        messages: [
          {
            role: "system",
            content: "You are a skilled frontend developer. Generate elaborate, visually appealing, and responsive HTML and Tailwind CSS code based on user prompts. Include comprehensive components with proper styling, interactions, and accessibility. Optimize for mobile and desktop. Only respond with the code, no explanations."
          },
          {
            role: "user",
            content: `Generate a detailed, production-ready UI with Tailwind CSS for: ${prompt}. Make it visually appealing, fully responsive, and with interactive elements where appropriate.`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to generate with OpenAI");
    }

    const data = await response.json();
    // Extract the generated code from the response
    const generatedContent = data.choices[0].message.content;
    
    // Extract HTML code from the response if it contains markdown code blocks
    if (generatedContent.includes("```html")) {
      return generatedContent.split("```html")[1].split("```")[0].trim();
    } else if (generatedContent.includes("```")) {
      return generatedContent.split("```")[1].split("```")[0].trim();
    }
    
    return generatedContent;
  } catch (error) {
    console.error("OpenAI API error:", error);
    toast({
      variant: "destructive",
      title: "OpenAI Error",
      description: error instanceof Error ? error.message : "Failed to generate with OpenAI",
    });
    throw error;
  }
};

// Function to generate UI with Groq
export const generateWithGroq = async (prompt, apiKey) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Using Llama3 model
        messages: [
          {
            role: "system",
            content: "You are a skilled frontend developer. Generate elaborate, visually appealing, and responsive HTML and Tailwind CSS code based on user prompts. Include comprehensive components with proper styling, interactions, and accessibility. Optimize for mobile and desktop. Only respond with the code, no explanations."
          },
          {
            role: "user",
            content: `Generate a detailed, production-ready UI with Tailwind CSS for: ${prompt}. Make it visually appealing, fully responsive, and with interactive elements where appropriate.`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to generate with Groq");
    }

    const data = await response.json();
    // Extract the generated code from the response
    const generatedContent = data.choices[0].message.content;
    
    // Extract HTML code from the response if it contains markdown code blocks
    if (generatedContent.includes("```html")) {
      return generatedContent.split("```html")[1].split("```")[0].trim();
    } else if (generatedContent.includes("```")) {
      return generatedContent.split("```")[1].split("```")[0].trim();
    }
    
    return generatedContent;
  } catch (error) {
    console.error("Groq API error:", error);
    toast({
      variant: "destructive",
      title: "Groq Error",
      description: error instanceof Error ? error.message : "Failed to generate with Groq",
    });
    throw error;
  }
};

// Generic function that chooses the appropriate service based on the model type
export const generateUICode = async (
  prompt,
  modelType,
  apiKey
) => {
  if (modelType === "openai") {
    return generateWithOpenAI(prompt, apiKey);
  } else {
    return generateWithGroq(prompt, apiKey);
  }
};