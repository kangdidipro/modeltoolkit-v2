
import Link from 'next/link';
import { Separator } from './ui/separator';

type FooterProps = {
  timestamp?: string;
}

export function Footer({ timestamp }: FooterProps) {
  return (
    <footer className="bg-muted/50 dark:bg-muted/20 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold font-headline">Model Toolkit</h2>
            <p className="text-sm text-muted-foreground mt-1">Your strategic partner in structured thinking.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Model Toolkit. All Rights Reserved.</p>
          <div className="flex items-center -mx-2 mt-4 sm:mt-0">
            {timestamp && <span className="text-xs text-muted-foreground mx-2">Update timestamp: {timestamp}</span>}
            <Link href="/blog" className="mx-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/about" className="mx-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/feedback" className="mx-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Feedback
            </Link>
            <Link href="/terms" className="mx-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
