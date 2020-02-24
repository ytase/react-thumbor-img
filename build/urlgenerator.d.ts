import { TbImg } from "./types";
declare function thumborURL(img: TbImg): string;
/**
 * This one is used for testing and local purposes, so that instead of using a thumbor server it returns
 * the original URL so that you can test images in development
 */
declare function dummyURL(img: TbImg): string;
export { thumborURL, dummyURL };
