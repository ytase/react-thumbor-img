import React, { useContext } from "react";
import { ThumborContext } from "./thumborcontext";
import { thumborURL, dummyURL } from "./urlgenerator";
import { ThumborImageProps, TbImg, SizeSet } from "./types";

function ThumborImage({
  generateSrcSet,
  id,
  className,
  style,
  alt,
  imgProps,
  sizeSet,
  src,
  ...ImgGen
}: ThumborImageProps) {
  const finalProps = Object.assign({ id, className, style, alt }, imgProps);

  const settings = useContext(ThumborContext);

  let URLGenerator = thumborURL;

  // An image path is relative if it start with only one slash
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

  const ImageGeneration: TbImg = {
    ...ImgGen,
    server: ImgGen.server || settings.server,
    src
  };
  if (!ImageGeneration.server) {
    throw "A server must be provided either in props or in context";
  }

  let finalSizeSet: SizeSet = sizeSet || {};
  // Adds the sourceset if the option was chosen
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
    finalProps.srcSet = Object.entries(finalSizeSet)
      .map(([condition, operation]) => {
        const img = URLGenerator({ ...ImageGeneration, ...operation });
        return img + " " + condition;
      })
      .join(", ");
  }

  // Adds the width and heights in case they are set, for styling reasons
  const imgWidth = Math.abs(ImageGeneration.width),
    imgHeight = Math.abs(ImageGeneration.height);
  if (imgWidth > 1) {
    finalProps.width = imgWidth;
  }
  if (imgHeight > 1) {
    finalProps.height = imgHeight;
  }
  return <img src={URLGenerator(ImageGeneration)} {...finalProps} />;
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

export { ThumborImage };
