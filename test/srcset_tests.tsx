import assert from "assert";
import { generateSrcSet } from "../module/utils";
import { basicInput, addParams } from "./utils";

describe("Source set generator", () => {
  it("should generate correctly 2x and 3x sets", () => {
    const input = addParams({
      height: 100,
      width: 200
    });
    assert.equal(
      generateSrcSet(input),
      "http://myserver.com/unsafe/400x200/center/middle/http://otherserver/img.jpg 2x, http://myserver.com/unsafe/600x300/center/middle/http://otherserver/img.jpg 3x"
    );
  });
});
