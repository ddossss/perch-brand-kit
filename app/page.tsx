"use client";

import BrandJourneyDashboard from "./components/brand-journey-dashboard";
import { ThemeProvider } from "./components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <BrandJourneyDashboard />
    </ThemeProvider>
  );
}