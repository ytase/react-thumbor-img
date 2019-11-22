import { ThumborImageProps } from './types'
import { thumborURL } from './urlgenerator'

function generateSrcSet(props: ThumborImageProps) {
	let srcSet = []
	for (let i =2; i <= 3; i++) {
		const input = Object.assign(
			{},
			props,
			{
				height: props.height * i,
				width: props.width * i
			}
		)
		srcSet.push(`${thumborURL(input)} ${i}x`)
	}
	// Source set URLs needs to be separated by a comma and an optional space
	return srcSet.join(', ')
}

export { generateSrcSet }