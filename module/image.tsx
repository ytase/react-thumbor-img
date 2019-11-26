import React, { useContext } from "react";
import { ThumborContext } from "./thumborcontext";
import { thumborURL } from "./urlgenerator";
import { ThumborImageProps, TbImg, SizeSet } from "./types";

function ThumborImage({
  generateSrcSet,
  id,
  className,
  style,
  alt,
  imgProps,
  sizeSet,
  ...ImgGen
}: ThumborImageProps) {
  const finalProps = Object.assign({ id, className, style, alt }, imgProps);

  const ImageGeneration: TbImg = {
    ...ImgGen,
    server: ImgGen.server || useContext(ThumborContext)
  };
  if (!ImgGen.server) {
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
        const img = thumborURL({ ...ImageGeneration, ...operation });
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
  return <img src={thumborURL(ImageGeneration)} {...finalProps} />;
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
