import React from 'react'
import { thumborURL } from './urlgenerator'
import { generateSrcSet as compileSrcSet } from './utils'

function ThumborImage(props) {
	const { 
		imgProps,
		generateSrcSet,
	} = props
	if (generateSrcSet) {
		imgProps.srcSet = compileSrcSet(props)
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