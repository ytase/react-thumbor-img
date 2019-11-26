import { thumborURL } from "../module/urlgenerator";
import { TbImg } from "../module/types";

const basicInput: TbImg = {
  server: "http://myserver.com",
  src: "http://otherserver/img.jpg",
  width: 0,
  height: 0,
  flipHorizontal: false,
  flipVertical: false,
  trim: false,
  fitIn: false,
  horizontalAlign: "center",
  verticalAlign: "middle",
  smart: false,
  filters: {},
  manualCrop: false
};

function addParams(params: Partial<TbImg>): TbImg {
  return Object.assign({}, basicInput, params);
}

export { basicInput, addParams };
