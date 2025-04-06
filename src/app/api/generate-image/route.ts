import { NextResponse } from "next/server";
import Replicate from "replicate";

// Initialize Replicate with API token
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(request: Request) {
  try {
    // Check for API token
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error("Missing Replicate API token");
      return NextResponse.json(
        { error: "Server configuration error. Missing API token." }, 
        { status: 500 }
      );
    }

    // Check for model ID
    const modelId = process.env.NEXT_PUBLIC_REPLICATE_MODEL;
    if (!modelId) {
      console.error("Missing Replicate model ID");
      return NextResponse.json(
        { error: "Server configuration error. Missing model ID." }, 
        { status: 500 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const prompt = body.prompt;
    const guidance_scale = body.guidance_scale ?? 7.5;

    // Validate inputs
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Run the model
    const output = await replicate.run(
      modelId as `${string}/${string}`,
      {
        input: {
          prompt: prompt.trim(),
          guidance_scale: Number(guidance_scale),
          num_outputs: 1
        }
      }
    );
      
    if (!output || !Array.isArray(output) || !output[0]) {
      return NextResponse.json(
        { error: "Model did not return any output" }, 
        { status: 500 }
      );
    }
      
    return NextResponse.json({ imageUrl: output[0] }, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: (error as Error).message || "An unexpected error occurred" }, 
      { status: 500 }
    );
  }
} 