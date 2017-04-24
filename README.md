# react-thumbor-img

You like React? But you use Thumbor?

Worry not, because you have now found the perfect library to use both together in a nice simple component. It currently handles only unsafe URLs, as safe URLs cannot be generated in the client side.

## Usage

Usage is simple, very simple:

```jsx
import React from 'react'
import { ThumborImage } from 'react-thumbor-img'

function MyAwesomeSection(props) {
	return <section>
			<ThumborImage
				server='http://mythumborserver.com'
				uri='http://imagestorage/imageurl.jpg'
				height={200}
				width={300}
			/>
		</section>
}

```

## Properties for ThumborImage

**server(required)**: URL of your thumbor server

**uri(required)**: URI of the original picture

**generateSrcSet**: If `true`, will generate a `srcset` attribute for the image that will contain 2x and 3x versions of the picture automatically. 
*default: true*

**width**: width in pixel for the standard size of the picture. Use **0** to indicate it should be automatic (original size, or proportional to the height respecting the ratio).
*default: 0*

**height**: height in pixel for the standard size of the picture. Use **0** to indicate it should be automatic (original size, or proportional to the width respecting the ratio).
*default: 0*

**flipHorizontal**: set to `true` if you want to flip the image horizontally
*default: false*

**flipVertical**: set to `true` if you want to flip the image vertical
*default: false*

**trim**: set to `true` if you want to remove the surrounding space (see [here](http://thumbor.readthedocs.io/en/latest/usage.html#trim))
*default: false*

**trim**: set to `true` if you want to shrink the image instead of auto-crop it (see [here](http://thumbor.readthedocs.io/en/latest/usage.html#fit-in))
*default: false*

**manualCrop**: If you want to manually crop the image to a certain position, set this property to an object `{top: y1, left: x1, bottom: y2, right: x2}`. Set to `false` for no manual cropping.
*default: false*

**horizontalAlign**: see [here](http://thumbor.readthedocs.io/en/latest/usage.html#horizontal-align)
*default: 'center'*

**verticalAlign**: see [here](http://thumbor.readthedocs.io/en/latest/usage.html#vertical-align)
*default: 'middle'*

**smart**: set this to `false` to disable the smart detection of focal points. See [here](http://thumbor.readthedocs.io/en/latest/usage.html#smart-cropping) for more details.
*default: true*

**filters**: An object which keys correspond to the filter names as defined in the [documentation](http://thumbor.readthedocs.io/en/latest/filters.html), and values are either:
- `true` when no argument is needed for the filter
- a single value when the filter takes only one argument
- an array of values corresponding to the parameters to be passed in the right order
*default: {}*

**Example:**
```javascript
const filters = {
	grayscake: true,
	background_color: 'blue',
	rgb: [20, 50, 60],
	blur: 7
}
```