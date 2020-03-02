import assert from "assert";
import { thumborURL } from "../module/urlgenerator";

import { basicInput, addParams } from "./utils";

describe("Thumbor URL", () => {
  it("should handle a basic url", () => {
    const expectedURL =
      "http://myserver.com/V1Eil9HGxlpcJ_OYpOLgBwO5kyM=/0x0/center/middle/http://otherserver/img.jpg";
    assert.equal(expectedURL, thumborURL(basicInput));
  });

  it("should handle flipping", () => {
    assert.equal(
      thumborURL(addParams({ flipHorizontal: true })),
      "http://myserver.com/los8R90UnJ2Mcwc33YwRXmqAsak=/-0x0/center/middle/http://otherserver/img.jpg"
    );

    assert.equal(
      thumborURL(addParams({ flipVertical: true })),
      "http://myserver.com/5mwNK4yjRtf1EaZik3fEQgN3lnI=/0x-0/center/middle/http://otherserver/img.jpg"
    );

    assert.equal(
      thumborURL(addParams({ flipHorizontal: true, flipVertical: true })),
      "http://myserver.com/chKBygsizsqQdgb9lYPsdSM3ME0=/-0x-0/center/middle/http://otherserver/img.jpg"
    );
  });

  it("should handle trim", () => {
    assert.equal(
      thumborURL(addParams({ trim: true })),
      "http://myserver.com/XvkNUWod9paJH8gZIPvqvT3tFKQ=/trim/0x0/center/middle/http://otherserver/img.jpg"
    );
  });

  it("should handle fitIn", () => {
    assert.equal(
      thumborURL(addParams({ fitIn: true })),
      "http://myserver.com/g1gBzmulm9AjRNumOASyDHtBkcU=/fit-in/0x0/center/middle/http://otherserver/img.jpg"
    );
  });

  it("should handle smart cropping", () => {
    assert.equal(
      thumborURL(addParams({ smart: true })),
      "http://myserver.com/c-OGJAaXJrs1fdKoHvBv_MDr4bY=/0x0/center/middle/smart/http://otherserver/img.jpg"
    );
  });

  it("should handle manual cropping", () => {
    assert.equal(
      thumborURL(
        addParams({
          manualCrop: {
            top: 10,
            left: 20,
            bottom: 60,
            right: 120
          }
        })
      ),
      "http://myserver.com/Jrb78iurTp8QJ0blRszWAbwewJ0=/20x10:120x60/0x0/center/middle/http://otherserver/img.jpg"
    );
  });

  it("should handle other alignments", () => {
    assert.equal(
      thumborURL(addParams({ horizontalAlign: "left" })),
      "http://myserver.com/BOeyBRTCIrq0jelAqhTKvJfxbb4=/0x0/left/middle/http://otherserver/img.jpg"
    );

    assert.equal(
      thumborURL(addParams({ verticalAlign: "top" })),
      "http://myserver.com/XvrfDvZ-zO8rja3nS5eyPM4t0C0=/0x0/center/top/http://otherserver/img.jpg"
    );
  });

  it("should handle filters", () => {
    assert.equal(
      thumborURL(
        addParams({
          filters: {
            fill: "blue",
            rgb: [20, 10, 40],
            grayscale: true
          },
          securityKey: ''
        })
      ),
      "http://myserver.com/unsafe/0x0/center/middle/filters:fill(blue):rgb(20,10,40):grayscale()/http://otherserver/img.jpg"
    );
  });

  it("should return unsafe url", () => {
    assert.equal(
      thumborURL(
        addParams({
          filters: {
            fill: "blue",
            rgb: [20, 10, 40],
            grayscale: true
          },
          securityKey: ''
        })
      ),
      "http://myserver.com/unsafe/0x0/center/middle/filters:fill(blue):rgb(20,10,40):grayscale()/http://otherserver/img.jpg"
    );
  });
});
