import React, { useContext } from "react";
import { ThumborContext } from "./thumborcontext";
import { thumborURL } from "./urlgenerator";
import { generateSrcSet as compileSrcSet } from "./utils";
import { ThumborImageProps, TbImg } from "./types";

function ThumborImage(props: ThumborImageProps) {
  const {
    generateSrcSet,
    id,
    className,
    style,
    alt,
    imgProps,
    ...ImgGen
  } = props;
  const finalProps = Object.assign({ id, className, style, alt }, imgProps);

  const ImageGeneration: TbImg = {
    ...ImgGen,
    server: ImgGen.server || useContext(ThumborContext)
  };
  if (!ImgGen.server) {
    throw "A server must be provided either in props or in context";
  }

  // Adds the sourceset if the option was chosen
  if (generateSrcSet) {
    finalProps.srcSet = compileSrcSet(ImageGeneration);
  }

  // Adds the width and heights in case they are set, for styling reasons
  const imgWidth = Math.abs(props.width),
    imgHeight = Math.abs(props.height);
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
