export type FilterValue = boolean | string | string[] | number[];

export type FilterDict = { [filterName: string]: FilterValue };

export interface Box {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// Describes the operations operated on a single picture
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

// Describes a scaled and modified picture
export interface TbImg extends TbImgOperation {
  server: string;
  src: string;
}

export type SizeSet = { [condition: string]: TbImgOperation };

export interface ThumborImageProps extends Omit<TbImg, "server"> {
  server?: string; // Server is optional because it can be provided by the context
  generateSrcSet?: boolean;
  sizeSet?: SizeSet;
  alt?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  imgProps?: React.ImgHTMLAttributes<HTMLElement>;
}
