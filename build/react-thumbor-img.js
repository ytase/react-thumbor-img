import React, { createContext, useContext } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var defaultSettings = {
  server: "",
  relativeImgPolicy: {
    name: "error"
  }
};
var ThumborContext = createContext(defaultSettings);

function ThumborConfiguration(props) {
  var children = props.children,
      newSettings = _objectWithoutProperties(props, ["children"]);

  var settings = _objectSpread2({}, defaultSettings, {}, newSettings);

  return React.createElement(ThumborContext.Provider, {
    value: settings
  }, children);
}

function cropSection(c) {
  return "".concat(c.left, "x").concat(c.top, ":").concat(c.right, "x").concat(c.bottom);
}

function filtersURIComponent(filters) {
  var elements = ["filters"];

  for (var name in filters) {
    if (filters.hasOwnProperty(name)) {
      var parameters = filters[name];
      var stringParameters = void 0; // If we have several parameters, they were passed as an array
      // and now they need to be comma separated, otherwise there is just one to convert to a string

      if (Array.isArray(parameters)) {
        stringParameters = parameters.join(",");
      } // If true, we don't even need to do anything, we just have an empty string and insert ()
      // Ex: {grayscale: true} => grayscale()
      else if (parameters === true) {
          stringParameters = "";
        } else {
          stringParameters = String(parameters);
        }

      elements.push("".concat(name, "(").concat(stringParameters, ")"));
    }
  }

  return elements.join(":");
}

function thumborURL(img) {
  var urlComponents = [img.server, "unsafe"]; // Add the trim parameter after unsafe if appliable

  img.trim && urlComponents.push("trim"); // Add the crop parameter if any

  img.manualCrop && urlComponents.push(cropSection(img.manualCrop)); // Add the fit-in parameter after crop if appliable

  img.fitIn && urlComponents.push("fit-in"); // Adds the final size parameter

  var finalSize = "";

  if (img.flipHorizontal) {
    // Adds minus to flip horizontally
    finalSize += "-";
  }

  finalSize += img.width + "x";

  if (img.flipVertical) {
    // Adds minus to flip vertically
    finalSize += "-";
  }

  finalSize += img.height;
  urlComponents.push(finalSize); // Adds the horizontal alignement after the size

  urlComponents.push(img.horizontalAlign || "center"); // Adds the vertical alignement after the size

  urlComponents.push(img.verticalAlign || "middle"); // Adds the smart parameter if appliable

  img.smart && urlComponents.push("smart"); // Compile the filters and add them right before the URI

  var filters = img.filters || {};
  Object.keys(filters).length > 0 && urlComponents.push(filtersURIComponent(filters)); // Finally, adds the real image uri

  urlComponents.push(img.src);
  var url = urlComponents.join("/");
  return url;
}
/**
 * This one is used for testing and local purposes, so that instead of using a thumbor server it returns
 * the original URL so that you can test images in development
 */


function dummyURL(img) {
  return img.src;
}

function ThumborImage(_ref) {
  var generateSrcSet = _ref.generateSrcSet,
      id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      alt = _ref.alt,
      imgProps = _ref.imgProps,
      sizeSet = _ref.sizeSet,
      src = _ref.src,
      ImgGen = _objectWithoutProperties(_ref, ["generateSrcSet", "id", "className", "style", "alt", "imgProps", "sizeSet", "src"]);

  var finalProps = Object.assign({
    id: id,
    className: className,
    style: style,
    alt: alt
  }, imgProps);
  var settings = useContext(ThumborContext);
  var URLGenerator = thumborURL; // An image path is relative if it start with only one slash

  if (/^\/[\w\d]/.test(src)) {
    switch (settings.relativeImgPolicy.name) {
      case "error":
        throw "Relative images are not acceptable";

      case "passThrough":
        URLGenerator = dummyURL;
        break;

      case "prependOrigin":
        src = settings.relativeImgPolicy.origin + src;
        break;
    }
  }

  var ImageGeneration = _objectSpread2({}, ImgGen, {
    server: ImgGen.server || settings.server,
    src: src
  });

  if (!ImgGen.server) {
    throw "A server must be provided either in props or in context";
  }

  var finalSizeSet = sizeSet || {}; // Adds the sourceset if the option was chosen

  if (generateSrcSet && !sizeSet) {
    finalSizeSet = {
      "2x": {
        width: ImageGeneration.width * 2,
        height: ImageGeneration.height * 2
      },
      "3x": {
        width: ImageGeneration.width * 3,
        height: ImageGeneration.height * 3
      }
    };
  }

  if (finalSizeSet) {
    finalProps.srcSet = Object.entries(finalSizeSet).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          condition = _ref3[0],
          operation = _ref3[1];

      var img = URLGenerator(_objectSpread2({}, ImageGeneration, {}, operation));
      return img + " " + condition;
    }).join(", ");
  } // Adds the width and heights in case they are set, for styling reasons


  var imgWidth = Math.abs(ImageGeneration.width),
      imgHeight = Math.abs(ImageGeneration.height);

  if (imgWidth > 1) {
    finalProps.width = imgWidth;
  }

  if (imgHeight > 1) {
    finalProps.height = imgHeight;
  }

  return React.createElement("img", _extends({
    src: URLGenerator(ImageGeneration)
  }, finalProps));
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
  horizontalAlign: "center",
  verticalAlign: "middle",
  smart: true,
  filters: {},
  generateSrcSet: true
};

export { ThumborConfiguration, ThumborImage, thumborURL };
