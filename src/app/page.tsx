"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [guidanceScale, setGuidanceScale] = useState<number>(7.5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt,
          guidance_scale: guidanceScale 
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }
      
      const data = await response.json();
      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        throw new Error('No image URL returned from API');
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError((error as Error).message || 'An error occurred while generating the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">AI Image Generator</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl">
        Create beautiful images with the power of AI using the FLUX.1 Schnell model.
        Simply enter a detailed prompt describing what you want to see.
      </p>
      
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Image Prompt
            </label>
            <textarea
              id="prompt"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              rows={3}
              required
            />
          </div>
          
          <div>
            <label htmlFor="guidance" className="block text-sm font-medium text-gray-700 mb-1">
              Guidance Scale: {guidanceScale}
            </label>
            <input
              id="guidance"
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Higher values make the image more closely match your prompt (recommended: 7-9)
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {isLoading && (
          <div className="mt-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Generating your image... This may take up to 30 seconds.</p>
          </div>
        )}
        
        {imageUrl && !isLoading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Generated Image</h2>
            <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={imageUrl}
                alt={prompt || "Generated image"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => {
                  setError("Failed to load the generated image. Please try again.");
                }}
              />
            </div>
            <div className="mt-4">
              <a 
                href={imageUrl} 
                download="generated-image.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
              >
                View Full Image
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
