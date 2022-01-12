import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Error404 } from './Error404.js'
import { Feed } from './Feed.js'
import { Header } from './Header.js'
import { PostPage } from './PostPage.js'

function App() {

	// Store the theme in local storage
	// By default, it is light theme
	// Passes these state modifiers to header to handle
	if (window.localStorage.getItem('isDarkTheme') === null) {
		window.localStorage.setItem('isDarkTheme', false)
	}
	const [isDarkTheme, setDarkTheme] = useState(window.localStorage.getItem('isDarkTheme') === 'true')

	return (
		<BrowserRouter>
			<div className={isDarkTheme ? 'dark' : ''}>
				<div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
					<Header isDarkTheme={isDarkTheme} setDarkTheme={setDarkTheme} />
					<main className="z-0 flex flex-col items-stretch max-w-3xl mx-auto px-4 pb-4">
						<Routes>
							<Route path="/"             element={<Feed />    } />
							<Route path="/pic/:picDate" element={<PostPage />} />
							<Route path="*"             element={<Error404 />} />
						</Routes>
					</main>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
