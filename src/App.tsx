import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { CropDatabase } from "./components/CropDatabase";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <h2 className="text-xl font-semibold text-primary">🌾 Crop Watering System</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 p-8">
        <Content />
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Authenticated>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {loggedInUser?.email?.split('@')[0] || "Farmer"}!
          </h1>
          <p className="text-xl text-gray-600">
            Optimize your crop watering with data-driven recommendations
          </p>
        </div>
        <CropDatabase />
      </Authenticated>

      <Unauthenticated>
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌾 Crop Watering System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get optimal watering recommendations for your crops
          </p>
          <SignInForm />
        </div>
      </Unauthenticated>
    </div>
  );
}
