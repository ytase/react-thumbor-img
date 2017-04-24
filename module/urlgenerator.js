function cropSection(c) {
	return `${c.left}x${c.top}:${c.right}x${c.bottom}`
}

function filtersURIComponent(filters) {
	const elements = ['filters']
	for (let name in filters) {
		if (filters.hasOwnProperty(name)) {
			const parameters = filters[name]
			let stringParameters
			// If we have several parameters, they were passed as an array 
			// and now they need to be comma separated, otherwise there is just one to convert to a string
			if (Array.isArray(parameters)) {
				stringParameters = parameters.join(',')
			}
			// If true, we don't even need to do anything, we just have an empty string and insert ()
			// Ex: {grayscale: true} => grayscale()
			else if (parameters === true) {
				stringParameters = ''
			}
			else {
				stringParameters = String(parameters)
			}
			elements.push(`${name}(${stringParameters})`)
		}
	}
	return elements.join(':')
}

function thumborURL({
	server,
	uri,
	width,
	height,
	flipHorizontal,
	flipVertical,
	trim,
	fitIn,
	horizontalAlign,
	verticalAlign,
	smart,
	filters,
	manualCrop,
}) {
	const urlComponents = [server, 'unsafe']
	
	// Add the trim parameter after unsafe if appliable
	trim && urlComponents.push('trim')

	// Add the crop parameter if any
	manualCrop && urlComponents.push(cropSection(manualCrop))

	// Add the fit-in parameter after crop if appliable
	fitIn && urlComponents.push('fit-in')

	// Adds the final size parameter
	let finalSize = ''
	if (flipHorizontal) {
		// Adds minus to flip horizontally
		finalSize += '-'
	}
	finalSize += width + 'x'
	if (flipVertical) {
		// Adds minus to flip vertically
		finalSize += '-'
	}
	finalSize += height
	urlComponents.push(finalSize)

	// Adds the horizontal alignement after the size
	urlComponents.push(horizontalAlign)

	// Adds the vertical alignement after the size
	urlComponents.push(verticalAlign)

	// Adds the smart parameter if appliable
	smart && urlComponents.push('smart')

	// Compile the filters and add them right before the URI
	Object.keys(filters).length > 0 && urlComponents.push(filtersURIComponent(filters))

	// Finally, adds the real image uri
	urlComponents.push(uri)

	const url = urlComponents.join('/')
	return url
}

export { thumborURL }