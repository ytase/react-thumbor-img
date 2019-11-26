export type FilterValue = boolean | string | string[] | number[];

export type FilterDict = { [filterName: string]: FilterValue };

export interface Box {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface TbImg {
  server: string;
  src: string;
  width: number;
  height: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  trim: boolean;
  fitIn: boolean;
  horizontalAlign: "left" | "center" | "right";
  verticalAlign: "top" | "middle" | "bottom";
  smart: boolean;
  filters: FilterDict;
  manualCrop: Box | false;
}

export interface ThumborImageProps extends TbImg {
  generateSrcSet?: boolean;
  alt?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  imgProps?: React.ImgHTMLAttributes<HTMLElement>;
}
