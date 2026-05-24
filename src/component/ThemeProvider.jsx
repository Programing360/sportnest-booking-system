"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export default function ThemeProviderWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      
    >
      {children}
    </ThemeProvider>
  );
}