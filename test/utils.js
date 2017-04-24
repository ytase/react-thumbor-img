import { thumborURL } from '../module/urlgenerator'

const basicInput = {
	server: 'http://myserver.com',
	uri: 'http://otherserver/img.jpg',
	width: 0,
	height: 0,
	flipHorizontal: false,
	flipVertical: false,
	trim: false,
	fitIn: false,
	horizontalAlign: 'center',
	verticalAlign: 'middle',
	smart: false,
	filters: {},
	manualCrop: false,
}


function addParams(params) {
	return Object.assign({}, basicInput, params)
}


export {
	basicInput,
	addParams,
}