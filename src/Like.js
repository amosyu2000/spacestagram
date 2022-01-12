import React, { useState } from 'react'
import dateFormat from 'dateformat'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'

// The like button, takes in a Date object so that it knows which day it corresponds to
export function Like({ date }) {

	const id = dateFormat(date, 'yyyy-mm-dd')

	// State for the like button
	const [isLiked, setLiked] = useState(storageContainsLike())

	// Returns a boolean value of whether the storage contains a like
	function storageContainsLike() {
		const likeData = window.localStorage.getItem('likes')
		if (likeData === null) {
			return false
		}
		const likeArray = likeData.split(',')
		return likeArray.includes(id)
	}

	// Pushes the date to the list of likes in storage
	function addLikeToStorage() {
		const likeData = window.localStorage.getItem('likes')
		if (likeData === null) {
			window.localStorage.setItem('likes', id)
			return
		}
		const likeArray = likeData.split(',')
		if (!likeArray.includes(id)) {
			window.localStorage.setItem('likes', [...likeArray, id])
			return
		}
	}

	// Removes the date from the list of likes in storage
	function removeLikeFromStorage() {
		const likeData = window.localStorage.getItem('likes')
		if (likeData === null) {
			return
		}
		let likeArray = likeData.split(',')
		const index = likeArray.indexOf(id)
		if (index !== -1) {
			likeArray.splice(index, 1)
			if (likeArray.length) {
				window.localStorage.setItem('likes', likeArray)
			}
			else {
				window.localStorage.removeItem('likes')
			}
		}
	}

	function toggleLike() {
		if (storageContainsLike()) {
			removeLikeFromStorage()
			setLiked(false)
		}
		else {
			addLikeToStorage()
			setLiked(true)
		}
	}

	return (
		<button 
			onClick={toggleLike}
			className="flex-1"
		>
			{
				isLiked ?
				<span className="flex flex-col items-center text-fuchsia-500 hover:text-fuchsia-400 dark:text-indigo-500 dark:hover:text-indigo-400">
					<IoHeart className="text-3xl" />
					<p>Liked</p>
				</span>
				:
				<span className="flex flex-col items-center text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50">
					<IoHeartOutline className="text-3xl" />
					<p>Like</p>
				</span>
			}	
		</button>
	)
}