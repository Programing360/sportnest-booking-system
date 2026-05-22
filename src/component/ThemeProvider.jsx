"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export const ThemeProviderWrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mounting, just render the children normally without the wrapper
  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
