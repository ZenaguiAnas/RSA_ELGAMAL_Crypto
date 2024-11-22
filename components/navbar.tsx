import Link from 'next/link';
import { LockIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LockIcon className="h-5 w-5" />
          <span>Encryption App</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/encrypt" className="text-sm hover:text-primary">
            Encrypt
          </Link>
          <Link href="/decrypt" className="text-sm hover:text-primary">
            Decrypt
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}