

export function BlogCardImage({ href }: { href: string }) {
    if (href === '/blog/beyond-the-canvas') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-beyond-canvas" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-beyond-canvas)" />
              <g transform="translate(600, 300) scale(1.1)">
                <rect x="-250" y="-150" width="500" height="300" rx="15" fill="hsl(var(--background))" opacity="0.5"/>
                <rect x="-220" y="-120" width="150" height="100" rx="5" fill="hsl(var(--primary))" opacity="0.1"/>
                <rect x="70" y="-120" width="150" height="100" rx="5" fill="hsl(var(--accent))" opacity="0.1"/>
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Innovation Platforms
              </text>
            </svg>
        )
    }
    if (href === '/blog/beyond-the-business-plan') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-beyond-plan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-beyond-plan)" />
              <g transform="translate(300, 300)">
                <rect x="-150" y="-100" width="300" height="200" rx="10" fill="hsl(var(--foreground))" opacity="0.05" />
                <text x="0" y="0" fontFamily="sans-serif" fontSize="24" textAnchor="middle" fill="hsl(var(--muted-foreground))">Plan</text>
              </g>
              <path d="M 480 300 C 550 250, 650 350, 720 300" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" opacity="0.5" strokeDasharray="10 5" />
              <g transform="translate(900, 300)">
                 <rect x="-150" y="-120" width="300" height="240" rx="15" fill="hsl(var(--primary))" opacity="0.1"/>
                 <rect x="-60" y="-80" width="120" height="60" rx="5" fill="hsl(var(--background))" opacity="0.7" />
                 <text x="0" y="-40" fontFamily="sans-serif" fontSize="18" textAnchor="middle" fill="hsl(var(--foreground))">Value Prop</text>
              </g>
              <text x="600" y="500" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="50" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Dynamic Strategy
              </text>
            </svg>
        )
    }
    if (href === '/blog/conducting-an-effective-swot-analysis-for-competitive-advantage') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-swot" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-swot)" />
              <g transform="translate(600, 300) scale(1.2)">
                <path d="M -150 -150 H 150 V 150 H -150 Z" fill="hsl(var(--foreground))" opacity="0.02" />
                <line x1="-150" y1="0" x2="150" y2="0" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
                <line x1="0" y1="-150" x2="0" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Competitive Edge
              </text>
            </svg>
        )
    }
    if (href === '/blog/time-management-strategies-for-busy-professionals') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-time" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-time)" />
              <g transform="translate(600, 300) scale(1.2)">
                <circle cx="0" cy="0" r="120" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="10 5" />
                <path d="M 0 -100 L 0 -20" stroke="hsl(var(--accent))" strokeWidth="4" />
                <path d="M 0 0 L 70 0" stroke="hsl(var(--accent))" strokeWidth="4" />
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Own Your Time
              </text>
            </svg>
        )
    }
    if (href === '/blog/task-prioritization-techniques-managing-time-more-effectively') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-prioritize" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-prioritize)" />
              <g transform="translate(600, 300) scale(1.1)">
                <rect x="-200" y="-80" width="100" height="160" rx="10" fill="hsl(var(--primary))" opacity="0.1" />
                <rect x="-50" y="-120" width="100" height="240" rx="10" fill="hsl(var(--accent))" opacity="0.1" />
                <rect x="100" y="-50" width="100" height="100" rx="10" fill="hsl(var(--primary))" opacity="0.1" />
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Master Your Time
              </text>
            </svg>
        )
    }
    if (href === '/blog/how-the-eisenhower-matrix-changes-the-way-you-work') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-transform" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-transform)" />
              <path d="M 200 300 H 1000" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.2" />
              <path d="M 350 450 L 500 300 L 650 150" stroke="hsl(var(--primary))" strokeWidth="4" opacity="0.4" fill="none" />
              <path d="M 500 300 L 850 300" stroke="hsl(var(--accent))" strokeWidth="4" opacity="0.4" fill="none" strokeDasharray="10 5" />
              <circle cx="500" cy="300" r="15" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="4" />
              <circle cx="650" cy="150" r="15" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="4" />
              <text x="600" y="400" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Transform Your Work
              </text>
            </svg>
        )
    }
    if (href === '/blog/prioritize-your-tasks-a-guide-to-mastering-the-eisenhower-matrix') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-eisenhower" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-eisenhower)" />
              <g transform="translate(600, 300) scale(1.2)">
                <path d="M -150 -150 H 150 V 150 H -150 Z" fill="hsl(var(--foreground))" opacity="0.02" />
                <line x1="-150" y1="0" x2="150" y2="0" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
                <line x1="0" y1="-150" x2="0" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Focus on What Matters
              </text>
            </svg>
        )
    }
    if (href === '/blog/a-complete-guide-to-strategic-planning-for-small-businesses') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-small-biz" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-small-biz)" />
              <g transform="translate(600, 300)">
                <path d="M-200 0 L-100 -173.2 L100 -173.2 L200 0 L100 173.2 L-100 173.2 Z" fill="hsl(var(--primary))" opacity="0.1" />
                <path d="M-100 0 L-50 -86.6 L50 -86.6 L100 0 L50 86.6 L-50 86.6 Z" fill="hsl(var(--accent))" opacity="0.15" />
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Plan for Growth
              </text>
            </svg>
        )
    }
    if (href === '/blog/productivity-enhancement-secrets-effective-strategies-and-tools') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-productivity" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-productivity)" />
                <path d="M-150,0 a150,75 0 1,0 300,0 a150,75 0 1,0 -300,0" fill="hsl(var(--primary))" opacity="0.05" transform="translate(600 300)" />
                <path d="M0,-150 a75,150 0 1,0 0,300 a75,150 0 1,0 0,-300" fill="hsl(var(--accent))" opacity="0.05" transform="translate(600 300)" />
                <circle cx="600" cy="300" r="50" fill="hsl(var(--foreground))" opacity="0.05" />
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Boost Your Output
              </text>
            </svg>
        )
    }
    if (href === '/blog/optimizing-your-business-with-model-toolkit') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-optimize" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-optimize)" />
              <path d="M100,500 C 300,400 400,200 600,300 S 800,500 1100,400" stroke="hsl(var(--primary))" fill="none" strokeWidth="3" opacity="0.4" />
              <path d="M150,100 L 450,250 L 150,400 Z" fill="hsl(var(--primary))" opacity="0.1" />
              <g transform="translate(900, 200)">
                <circle cx="0" cy="0" r="80" fill="hsl(var(--accent))" opacity="0.1" />
                <circle cx="0" cy="0" r="20" fill="hsl(var(--accent))" opacity="0.3" />
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Drive Growth
              </text>
            </svg>
        )
    }

    if (href === '/blog/10-best-productivity-tools') {
        return (
            <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-1)" />
              <path d="M 150 200 Q 250 100 350 200 T 550 200" stroke="hsl(var(--primary))" fill="none" strokeWidth="3" opacity="0.6" />
              <path d="M 800 450 Q 900 550 1000 450 T 1200 450" stroke="hsl(var(--accent))" fill="none" strokeWidth="3" opacity="0.6" />
              <rect x="250" y="300" width="100" height="100" rx="15" fill="hsl(var(--primary))" opacity="0.2" transform="rotate(45 300 350)"/>
              <circle cx="900" cy="200" r="60" fill="hsl(var(--accent))" opacity="0.2" />
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Think Smarter
              </text>
            </svg>
        );
    }
    if (href === '/blog/understanding-various-business-models-for-startup-growth') {
        return (
            <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                    <linearGradient id="grad-card-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#grad-card-2)" />
                <path d="M 200 500 C 300 400, 400 400, 500 300 S 600 100, 700 150" stroke="hsl(var(--primary))" fill="none" strokeWidth="4" opacity="0.5" strokeDasharray="10 10" />
                <path d="M 1000 100 C 900 200, 800 200, 700 300 S 600 500, 500 450" stroke="hsl(var(--accent))" fill="none" strokeWidth="4" opacity="0.5" strokeDasharray="10 10" />
                <rect x="200" y="150" width="120" height="80" rx="10" fill="hsl(var(--primary))" opacity="0.1" />
                <circle cx="950" cy="400" r="70" fill="hsl(var(--accent))" opacity="0.1" />
                <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                    Build to Scale
                </text>
            </svg>
        );
    }
    if (href === '/blog/formulating-a-strong-business-strategy-step-by-step') {
        return (
            <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                    <linearGradient id="grad-card-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#grad-card-3)" />
                <path d="M 150 450 C 300 450, 250 150, 450 150 S 600 450, 750 450 S 900 150, 1050 150" stroke="hsl(var(--primary))" fill="none" strokeWidth="3" opacity="0.4" strokeDasharray="8 8" />
                <circle cx="150" cy="450" r="10" fill="hsl(var(--primary))" opacity="0.7"/>
                <circle cx="450" cy="150" r="10" fill="hsl(var(--accent))" opacity="0.7"/>
                <circle cx="750" cy="450" r="10" fill="hsl(var(--primary))" opacity="0.7"/>
                <circle cx="1050" cy="150" r="10" fill="hsl(var(--accent))" opacity="0.7"/>
                <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                    Chart Your Course
                </text>
            </svg>
        );
    }
    if (href === '/blog/driving-innovation-in-your-company') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                    <linearGradient id="grad-card-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#grad-card-4)" />
                <circle cx="600" cy="300" r="150" fill="hsl(var(--primary))" opacity="0.05" />
                <path d="M 450 300 C 400 200, 800 200, 750 300" stroke="hsl(var(--primary))" fill="none" strokeWidth="3" opacity="0.4" />
                <path d="M 480 300 C 450 400, 750 400, 720 300" stroke="hsl(var(--accent))" fill="none" strokeWidth="3" opacity="0.4" />
                <rect x="270" y="120" width="60" height="60" rx="10" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" opacity="0.5" transform="rotate(-25 300 150)" />
                <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                    Spark New Ideas
                </text>
            </svg>
        );
    }
    if (href === '/blog/from-idea-to-action-keys-to-successful-business-plan-execution') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                    <linearGradient id="grad-card-5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#grad-card-5)" />
                <circle cx="200" cy="300" r="80" fill="hsl(var(--accent))" opacity="0.1" />
                <text x="200" y="315" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="40" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.6">Idea</text>
                <path d="M 300 300 H 450" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" strokeDasharray="10 5" />
                <rect x="500" y="230" width="200" height="140" rx="10" fill="hsl(var(--primary))" opacity="0.1" />
                <text x="600" y="305" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="40" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.6">Plan</text>
                <path d="M 750 300 H 900" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" strokeDasharray="10 5" />
                <path d="M930 250 L 1070 250 L 1090 300 L 1070 350 L 930 350 L 910 300 Z" fill="hsl(var(--accent))" opacity="0.2" />
                <text x="1000" y="315" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="40" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.6">Action</text>
            </svg>
        );
    }
     if (href === '/blog/5-personal-development-models-to-reach-your-full-potential') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                    <linearGradient id="grad-card-6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#grad-card-6)" />
                <path d="M 150 500 C 300 450, 400 350, 600 300 S 800 150, 1050 100" stroke="hsl(var(--primary))" fill="none" strokeWidth="4" opacity="0.3" />
                <path d="M 100 100 C 250 150, 350 250, 600 300 S 850 450, 1100 500" stroke="hsl(var(--accent))" fill="none" strokeWidth="4" opacity="0.3" />
                <circle cx="600" cy="300" r="50" fill="hsl(var(--primary))" opacity="0.1" />
                <circle cx="600" cy="300" r="25" fill="hsl(var(--accent))" opacity="0.2" />
                <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                    Unlock Potential
                </text>
            </svg>
        );
    }
    if (href === '/blog/best-free-tools-for-business-planning-and-productivity') {
        return (
             <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="grad-card-free-tools" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#grad-card-free-tools)" />
              <g transform="translate(600, 300)">
                <path d="M-100 -50 L100 -50 L120 0 L100 50 L-100 50 L-120 0 Z" fill="hsl(var(--primary))" opacity="0.1" />
                 <circle cx="0" cy="0" r="40" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" opacity="0.4" />
              </g>
              <text x="600" y="310" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.8">
                Powerful & Free
              </text>
            </svg>
        )
    }
    
    return <div className="w-full h-full bg-muted/20"></div>;
}
