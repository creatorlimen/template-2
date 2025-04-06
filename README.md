# Ansh & Riley Full-Stack Template

This is a full-stack template project for Software Composers to create  applications with AI.

## Getting started
To create a new project, you go to `/paths`, choose from our list of Paths, and then use Cursor's Composer feature to quickly scaffold your project!

You can also edit the Path's prompt template to be whatever you like!

## Technologies used
This doesn't really matter, but is useful for the AI to understand more about this project. We are using the following technologies
- React with Next.js 14 App Router
- TailwindCSS
- Firebase Auth, Storage, and Database
- Multiple AI endpoints including OpenAI, Anthropic, and Replicate using Vercel's AI SDK

# AI Image Generator with Flux Schnell

This application allows you to generate images using the power of AI with the Flux Schnell model from Replicate.

## Features

- Generate images from text prompts
- Adjust guidance scale to control how closely the AI follows your prompts
- Clean, responsive UI built with Next.js and Tailwind CSS
- Real-time feedback with loading indicators and error messages

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env.local` file with your Replicate API token and model ID:
   ```
   REPLICATE_API_TOKEN=your_api_token_here
   NEXT_PUBLIC_REPLICATE_MODEL=black-forest-labs/flux-schnell
   ```
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- React with Next.js 14 App Router
- TailwindCSS
- Firebase Auth, Storage, and Database
- Replicate API for image generation

## Note

This project was built using the full-stack template for Software Composers to create applications with AI.

## Credits

Original template by Ansh & Riley Full-Stack Template