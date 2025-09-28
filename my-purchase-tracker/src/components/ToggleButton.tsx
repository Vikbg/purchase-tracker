/*
  Upgraded ToggleSwitch Component
  - Icons are now inside the thumb.
  - Fully customizable via props for icons, colors, and actions.
*/

"use client"

import React, { useState, ReactNode } from 'react';

// Default "On" Icon (Checkmark)
const DefaultIconOn = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 text-green-500">
	<path
	  d="M20 6 9 17l-5-5"
	  stroke="currentColor"
	  strokeWidth="4"
	  strokeLinecap="round"
	  strokeLinejoin="round"
	  fill="none"
	/>
  </svg>
);

// Default "Off" Icon (X)
const DefaultIconOff = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 text-gray-400">
	<path
	  d="M18 6 6 18M6 6l12 12"
	  stroke="currentColor"
	  strokeWidth="4"
	  strokeLinecap="round"
	  strokeLinejoin="round"
	  fill="none"
	/>
  </svg>
);

// --- Component Props Interface ---
interface ToggleSwitchProps {
  /** The initial state of the switch (true for "on", false for "off"). Defaults to `false`. */
  initialState?: boolean;
  /** A callback function that runs when the switch is toggled. It receives the new boolean state. */
  onChange?: (enabled: boolean) => void;
  /** Set to `true` to display icons inside the thumb. Defaults to `false`. */
  withIcons?: boolean;
  /** A React component or SVG to display for the "on" state. Uses a default checkmark if not provided. */
  iconOn?: ReactNode;
  /** A React component or SVG to display for the "off" state. Uses a default "X" if not provided. */
  iconOff?: ReactNode;
  /** Tailwind CSS class for the background color in the "on" state. Defaults to `bg-green-500`. */
  colorOn?: string;
  /** Tailwind CSS class for the background color in the "off" state. Defaults to `bg-gray-400`. */
  colorOff?: string;
  /** Tailwind CSS class for the thumb's background color. Defaults to `bg-white`. */
  thumbColor?: string;
  /** Additional CSS classes for custom styling on the main label element. */
  className?: string;
}

// --- The ToggleSwitch Component ---
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initialState = false,
  onChange = () => {},
  withIcons = false,
  iconOn = <DefaultIconOn />,
  iconOff = <DefaultIconOff />,
  colorOn = 'bg-green-500',
  colorOff = 'bg-gray-400',
  thumbColor = 'bg-white',
  className = '',
}) => {
  const [enabled, setEnabled] = useState(initialState);

  const handleToggle = () => {
	const newState = !enabled;
	setEnabled(newState);
	onChange(newState); // Execute the callback function with the new state
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
	// Allow toggling with Enter or Space key for accessibility
	if (e.key === 'Enter' || e.key === ' ') {
	  e.preventDefault();
	  handleToggle();
	}
  };

  return (
	<label
	  className={`inline-flex items-center cursor-pointer group ${className}`}
	  role="switch"
	  aria-checked={enabled}
	  tabIndex={0}
	  onKeyDown={handleKeyDown}
	>
	  <input
		type="checkbox"
		checked={enabled}
		onChange={handleToggle}
		className="sr-only" // Hide the default checkbox
		aria-hidden="true"
	  />

	  {/* Track */}
	  <span
		className={`w-12 h-7 flex items-center p-1 rounded-full transition-colors duration-300 ease-in-out ${
		  enabled ? colorOn : colorOff
		}`}
	  >
		{/* Thumb */}
		<span
		  className={`w-5 h-5 flex items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${thumbColor} ${
			enabled ? 'translate-x-5' : 'translate-x-0'
		  }`}
		>
		  {withIcons && (enabled ? iconOn : iconOff)}
		</span>
	  </span>
	</label>
  );
};

export default ToggleSwitch;