/// <reference types="react" />
import { ThumborImageProps } from "./types";
declare function ThumborImage({ generateSrcSet, id, className, style, alt, imgProps, sizeSet, src, ...ImgGen }: ThumborImageProps): JSX.Element;
declare namespace ThumborImage {
    var defaultProps: {
        imgProps: {};
        server: any;
        src: any;
        width: number;
        height: number;
        flipHorizontal: boolean;
        flipVertical: boolean;
        trim: boolean;
        fitIn: boolean;
        manualCrop: boolean;
        horizontalAlign: string;
        verticalAlign: string;
        smart: boolean;
        filters: {};
        generateSrcSet: boolean;
    };
}
export { ThumborImage };
