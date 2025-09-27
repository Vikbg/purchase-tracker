/* Need to add a proprietie to change for an icon or not */

import React, { useState } from 'react';

const ToggleSwitch: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
	<label
	  className="inline-flex items-center cursor-pointer group"
	  role="switch"
	  aria-checked={enabled}
	  tabIndex={0}
	  onKeyDown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') setEnabled(!enabled);
	  }}
	>
	  <input
		type="checkbox"
		checked={enabled}
		onChange={() => setEnabled(!enabled)}
		className="sr-only"
		aria-hidden="true"
	  />

	  <span className={`w-10 h-6 flex items-center px-1 rounded-full transition-colors duration-300 ${
		enabled ? 'bg-green-500' : 'bg-gray-400'
	  }`}>
		<span
		  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
			enabled ? 'translate-x-4' : 'translate-x-0'
		  }`}
		></span>
	  </span>

	  <span className="ml-3 text-sm text-gray-800">
		{enabled ? (
		  <svg
			aria-label="enabled"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className="w-5 h-5 text-green-600 transition-opacity duration-200"
		  >
			<g
			  strokeLinejoin="round"
			  strokeLinecap="round"
			  strokeWidth="2.5"
			  fill="none"
			  stroke="currentColor"
			>
			  <path d="M20 6 9 17l-5-5" />
			</g>
		  </svg>
		) : (
		  <svg
			aria-label="disabled"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className="w-5 h-5 text-gray-600 transition-opacity duration-200"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		  >
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		  </svg>
		)}
	  </span>
	</label>
  );
};

export default ToggleSwitch;
