import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Model Toolkit',
  description: 'A toolkit for business and productivity models.',
  icons: {
    icon: '/favicon-modeltoolkit.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.React.Node;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async custom-element="amp-auto-ads" src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js" />
        <Script id="gatekeeper-consent-1" src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false" strategy="beforeInteractive" />
        <Script id="gatekeeper-consent-2" src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false" strategy="beforeInteractive" />
        <Script id="ezoic-sa" async src="//www.ezojs.com/ezoic/sa.min.js" strategy="beforeInteractive" />
        <Script
          id="ezoic-standalone-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N93R56PSP9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-N93R56PSP9');
          `}
        </Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6086736525215106" crossOrigin="anonymous" strategy="afterInteractive" />
      </head>
      <body className="font-body antialiased">
        <amp-auto-ads type="adsense" data-ad-client="ca-pub-6086736525215106"></amp-auto-ads>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
