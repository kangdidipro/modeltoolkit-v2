"use client";

import Script from "next/script";

export default function SkimlinksWidget() {
  return (
    <Script
      id="skimlinks-script"
      type="text/javascript"
      src="https://s.skimresources.com/js/288878X1775662.skimlinks.js"
      strategy="afterInteractive"
    />
  );
}
