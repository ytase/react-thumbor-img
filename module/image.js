import React from 'react'
import { thumborURL } from './urlgenerator'
import { generateSrcSet as compileSrcSet } from './utils'

function ThumborImage(props) {
	const { 
		generateSrcSet,
		width,
		height,
	} = props
	const imgProps = Object.assign({}, props.imgProps)

	// Adds the sourceset if the option was chosen
	if (generateSrcSet) {
		imgProps.srcSet = compileSrcSet(props)
	}

	// Adds the width and heights in case they are set, for styling reasons
	if (Math.abs(width) > 1) {
		imgProps.width = Math.abs(width)
	}
	if (Math.abs(height) > 1) {
		imgProps.height = Math.abs(height)
	}
	return <img
			src={ thumborURL(props) }
			{...imgProps}
		/>
}

ThumborImage.defaultProps = {
	imgProps: {},
	server: null,
	src: null,
	width: 0,
	height: 0,
	flipHorizontal: false,
	flipVertical: false,
	trim: false,
	fitIn: false,
	manualCrop: false,
	horizontalAlign: 'center',
	verticalAlign: 'middle',
	smart: true,
	filters: {},
	generateSrcSet: true
}

export { ThumborImage }