import { Box, FilterDict, TbImg } from "./types";

function cropSection(c: Box) {
  return `${c.left}x${c.top}:${c.right}x${c.bottom}`;
}

function filtersURIComponent(filters: FilterDict) {
  const elements = ["filters"];
  for (let name in filters) {
    if (filters.hasOwnProperty(name)) {
      const parameters = filters[name];
      let stringParameters;
      // If we have several parameters, they were passed as an array
      // and now they need to be comma separated, otherwise there is just one to convert to a string
      if (Array.isArray(parameters)) {
        stringParameters = parameters.join(",");
      }
      // If true, we don't even need to do anything, we just have an empty string and insert ()
      // Ex: {grayscale: true} => grayscale()
      else if (parameters === true) {
        stringParameters = "";
      } else {
        stringParameters = String(parameters);
      }
      elements.push(`${name}(${stringParameters})`);
    }
  }
  return elements.join(":");
}

function thumborURL(img: TbImg) {
  const urlComponents = [img.server, "unsafe"];

  // Add the trim parameter after unsafe if appliable
  img.trim && urlComponents.push("trim");

  // Add the crop parameter if any
  img.manualCrop && urlComponents.push(cropSection(img.manualCrop));

  // Add the fit-in parameter after crop if appliable
  img.fitIn && urlComponents.push("fit-in");

  // Adds the final size parameter
  let finalSize = "";
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
  urlComponents.push(finalSize);

  // Adds the horizontal alignement after the size
  urlComponents.push(img.horizontalAlign || "center");

  // Adds the vertical alignement after the size
  urlComponents.push(img.verticalAlign || "middle");

  // Adds the smart parameter if appliable
  img.smart && urlComponents.push("smart");

  // Compile the filters and add them right before the URI
  const filters = img.filters || {};
  Object.keys(filters).length > 0 &&
    urlComponents.push(filtersURIComponent(filters));

  // Finally, adds the real image uri
  urlComponents.push(img.src);

  const url = urlComponents.join("/");
  return url;
}

export { thumborURL };
