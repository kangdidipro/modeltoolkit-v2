import Link from 'next/link';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

type FooterProps = {
  timestamp?: string;
  className?: string;
}

export function Footer({ timestamp, className }: FooterProps) {
  return (
    <footer className={cn("footer bg-muted/50 dark:bg-muted/20 mt-auto", className)}>
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
              Terms
            </Link>
            <Link href="/privacy" className="mx-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
