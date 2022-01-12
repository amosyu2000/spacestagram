import React, { Fragment, useState, useRef, useEffect, useCallback } from 'react'
import { Post } from './Post.js'

// Infinite scrolling feed of images
export function Feed() {
	document.title = "Spacestagram • Your Feed"

	function daysBefore(num) {
		const date = new Date()
		return date.setDate(date.getDate() - num)
	}

	// Generate 3 posts to start with
	const [postArray, setPostArray] = useState([...Array(3).keys()].map(daysBefore))

	const [page, setPage] = useState(1)

	// Reference to the loader div
	const loader = useRef('loader')

	// Handler for when the loader div becomes visible
	const handleObserver = useCallback((entities) => {
		const target = entities[0]
		if (target.isIntersecting) {
			setPage(_page => _page + 1)
		}
	}, [])

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '20px',
			threshold: 1.0,
		}
		// initialize IntersectionObserver and attach to loader div
		const observer = new IntersectionObserver(handleObserver, options)
		if (loader.current) {
			observer.observe(loader.current)
		}
	}, [handleObserver])

	const loadMorePosts = useCallback(async () => {
		const len = postArray.length
		// Add 3 more posts to the end
		await setPostArray(_prev => [..._prev, daysBefore(len), daysBefore(len+1), daysBefore(len+2)])
	}, [page])

	useEffect(() => {
		loadMorePosts()
	}, [page, loadMorePosts])

	return (
		<Fragment>
			<h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Your Feed</h1>
			{postArray.map((date) => <Post date={date} key={date} />)}
			<div ref={loader}/>
		</Fragment>
	)
}