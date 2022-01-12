import React, { Fragment, useEffect, useState } from 'react'
import { MdFullscreenExit, MdFullscreen, MdOutlineHideImage } from 'react-icons/md'
import dateFormat from 'dateformat'

import { Like } from './Like.js'
import { Share } from './Share.js'

export function Post({ date }) {

	// Converts the date to a readable format for display
	const dayEnglish = dateFormat(date, 'mmmm dS, yyyy')
	const shareableLink = `https://amosyu2000-spacestagram.netlify.app/pic/${dateFormat(date, 'yyyymmdd')}`

	// Each post individually fetches image data from the API upon mount
	const [imgData, setImgData] = useState(false)
	const [apiError, setApiError] = useState(false)
	useEffect(() => {
		async function fetchAPI() {
			const day = dateFormat(date, 'yyyy-mm-dd')
			// All environment variables must be prefixed with REACT_APP_ in a React project (https://stackoverflow.com/a/53237392/12191708)
			const apiKey = process.env.REACT_APP_NASA_API_KEY
			const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${day}&api_key=${apiKey}&thumbs=true`)
			// Check that the response is as expected (2xx)
			if (response.ok) {
				setImgData(await response.json())
			}
			// If something goes wrong, mainly 4xx NotFound errors, and 5xx server errors
			else {
				setApiError(true)
			}
		}
		fetchAPI()
	}, [date])

	// State for selecting whether to view the image in 'cover' or 'contain' mode
	const [isCoverMode, setCoverMode] = useState(true)

	// State for the description to either be abbreviated or full
	const [isDescAbbr, setDescAbbr] = useState(true)

	// State for showing and hiding the shareable link
	const [showLink, setShowLink] = useState(false)

	// Decides where the image url is located in the image data based on the media type
	function getImageSource() {
		if (imgData === false) return null
		if (imgData.media_type === 'image') {
			return imgData.url
		}
		else if (imgData.media_type === 'video') {
			return imgData.thumbnail_url
		}
		// Fallback in case there is an unsupported media format
		else {
			return null
		}
	}

	return (
		<div className="sm:flex rounded-lg overflow-hidden mb-6 shadow dark:shadow-gray-600 bg-gray-100 dark:bg-gray-800">
			<div 
				onClick={() => setCoverMode(!isCoverMode)}
				className="relative flex items-center justify-center aspect-square w-full sm:w-3/5 bg-gray-200 dark:bg-black"
			>
				{
					apiError ?
					<span className="flex flex-col items-center justify-center text-gray-700 dark:text-gray-200">
						<MdOutlineHideImage className="text-5xl" />
						<p className="pt-3">This picture was not found.</p>
					</span>
					: imgData !== false ?
					<Fragment>
						<img 
							src={getImageSource()} 
							alt={imgData.title} 
							className={`${isCoverMode ? 'object-cover' : 'object-contain'} aspect-square`} 
						/>
						<div className="transition-opacity opacity-0 hover:opacity-100 cursor-pointer absolute w-full h-full flex items-center justify-center">
							<span className="text-6xl text-gray-50">
								{
									isCoverMode ? <MdFullscreenExit /> : <MdFullscreen />
								}
							</span>
						</div>
					</Fragment>
					:
					undefined
				}
			</div>
			<div className="flex flex-col items-start sm:w-2/5 p-4 text-gray-600 dark:text-gray-400">
				{
					imgData !== false &&
					<Fragment>
						<div className="mb-auto">
							<h1 className="font-bold pb-3 text-gray-700 dark:text-gray-200">
								{imgData.title}
							</h1>
							<p className={isDescAbbr ? "line-clamp-5" : undefined}>
								{dayEnglish} • {imgData.explanation}
							</p>
							<button
								onClick={() => setDescAbbr(!isDescAbbr)}
								className="font-semibold hover:underline mb-6 text-gray-700 dark:text-gray-200"
							>
								{isDescAbbr ? 'Read more' : 'Read less'}
							</button>
						</div>
						{
							showLink &&
							<input
								autoFocus
								type="url"
								value={shareableLink}
								readOnly
								onFocus={(e) => e.target.select()}
								className="w-full rounded outline-0 p-1 shadow dark:shadow-gray-600 bg-gray-50 dark:bg-gray-700"
							/>
						}
						<div className="flex justify-around w-full pt-4">
							<Like date={date} />
							<Share date={date} onClick={() => setShowLink(!showLink)} />
						</div>
					</Fragment>
				}
			</div>
		</div>
	)
}