export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">
          Loading...
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Preparing your AI Image Generator
        </p>
      </div>
    </div>
  );
} 