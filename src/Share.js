import React from 'react'
import { MdLink } from 'react-icons/md'

// The share button, all functionality is handled by Post.js
export function Share({ onClick }) {
	return (
		<button 
			onClick={onClick}
			className="flex-1 flex flex-col items-center justify-center text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50"
		>
			<MdLink className="inline text-3xl" />
			<p>Share</p>
		</button>
	)
}