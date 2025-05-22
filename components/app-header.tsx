import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppHeader() {
  return (
    <header className="bg-green-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold">Potato Disease Detector</h1>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/icon.png" alt="CodeBasics Logo" />
            <AvatarFallback>Troy Legacy</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
