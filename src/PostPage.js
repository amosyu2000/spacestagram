import React from 'react'
import dateFormat from 'dateformat'
import { useParams } from 'react-router-dom'

import { Error404 } from './Error404.js'
import { Post } from './Post.js'

export function PostPage() {
	// Get the parameter from the url
	const { picDate } = useParams()

	// Since the parameter is so readable, I fully expect people to mess around with it
	// So I need to check that the parameter is a string of 8 integers as expected
	const re = new RegExp('^[0-9]{8}$', 'g')
	if (!picDate.match(re)) return <Error404 />

	const year = parseInt(picDate.slice(0,4))
	const month = parseInt(picDate.slice(4,6)) - 1 // Month is zero-indexed
	const day = parseInt(picDate.slice(6,8))
	const date = new Date(year, month, day)

	// Update the tab title
	document.title = `Spacestagram • Photo from ${dateFormat(date, 'mmmm dS, yyyy')}`

	return <Post date={date} />
}