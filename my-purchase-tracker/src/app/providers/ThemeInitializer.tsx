"use client";

import { useEffect } from 'react';

// This component runs on every client-side page load (because it's in layout)
export default function ThemeInitializer() {
  useEffect(() => {
	// Check localStorage for the stored theme preference
	const storedTheme = localStorage.getItem('theme');

	// Default to 'light' if nothing is found
	const isDark = storedTheme === 'dark';

	// Apply or remove the 'dark' class directly to the document element (<html>)
	if (isDark) {
	  document.documentElement.classList.add('dark');
	} else {
	  document.documentElement.classList.remove('dark');
	}

	// This effect only needs to run once on mount
  }, []);

  // This component doesn't need to render anything
  return null;
}