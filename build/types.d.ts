/// <reference types="react" />
export declare type FilterValue = boolean | string | string[] | number[];
export declare type FilterDict = {
    [filterName: string]: FilterValue;
};
export interface Box {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface TbImgOperation {
    width: number;
    height: number;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    trim?: boolean;
    fitIn?: boolean;
    horizontalAlign?: "left" | "center" | "right";
    verticalAlign?: "top" | "middle" | "bottom";
    smart?: boolean;
    filters?: FilterDict;
    manualCrop?: Box | false;
}
export interface TbImg extends TbImgOperation {
    server: string;
    src: string;
    securityKey?: string;
}
export declare type SizeSet = {
    [condition: string]: TbImgOperation;
};
export interface ThumborImageProps extends Omit<TbImg, "server"> {
    server?: string;
    generateSrcSet?: boolean;
    sizeSet?: SizeSet;
    alt?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    imgProps?: React.ImgHTMLAttributes<HTMLElement>;
}
