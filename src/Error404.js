import React from 'react'
import { Link } from 'react-router-dom'

export function Error404() {
	return (
		<div className="px-4 py-8 text-gray-600 shadow bg-gray-100 dark:text-gray-400 dark:shadow-gray-600 dark:bg-gray-800">
			<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">404</h1>
			<p>You seem to have lost your way while staring into the vast unknown of outer space. Head back to the homepage <Link to="/" className="underline">here</Link>.</p>
		</div>
	)
}