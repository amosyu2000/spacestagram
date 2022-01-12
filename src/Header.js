import React, { Fragment, useEffect, useState } from 'react'
import { DiGithubBadge } from 'react-icons/di'
import { GiSpaceSuit } from 'react-icons/gi'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { Link } from 'react-router-dom'

// The top bar of the site
// Supports theme toggling and navigation to the Github repository
export function Header({ isDarkTheme, setDarkTheme }) {

	// Only show the bar's drop shadow if the page is scrolled down
	const [showDropShadow, setShowDropShadow] = useState(false)
	useEffect(() => {
		function handleScroll(_) {
			if (window.scrollY === 0) {
				setShowDropShadow(false)
			}
			else {
				setShowDropShadow(true)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Theme toggling is handled by the header even though the state is created at the App level
	function toggleTheme() {
		const nextTheme = !isDarkTheme
		window.localStorage.setItem('isDarkTheme', nextTheme)
		setDarkTheme(nextTheme)
	}

	return (
		<Fragment>
			<header className={`${showDropShadow && 'shadow dark:shadow-gray-600'} z-50 fixed top-0 left-0 right-0 flex items-center p-4 bg-gray-50 dark:bg-gray-900`}>
				<Link to="/">
					<GiSpaceSuit className="inline text-3xl mr-4 fill-indigo-500" />
				</Link>
				<Link to="/">
					<span className="text-2xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">Spacestagram</span>
				</Link>
				
				<span className="cursor-pointer ml-auto pl-4" onClick={toggleTheme}>
					{
						isDarkTheme ? 
						<MdDarkMode className="inline text-3xl fill-indigo-500 hover:fill-indigo-400" /> : 
						<MdLightMode className="inline text-3xl fill-fuchsia-500 hover:fill-fuchsia-400" />
					}
				</span>
				<a 
					href="https://github.com/amosyu2000/spacestagram"
					target="_blank"
					rel="noopener noreferrer"
					className="ml-4 text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50"
				>
					<DiGithubBadge className="inline text-4xl" />
				</a>
			</header>
			<div className="h-24"></div>
		</Fragment>
	)
}