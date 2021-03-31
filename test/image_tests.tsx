import React from "react";
import assert from "assert";
import { shallow, render } from "enzyme";
import { ThumborImage, ThumborConfiguration } from "../module";
import { RelativeImgPolicy } from "../module/thumborcontext";

import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

configure({ adapter: new ReactSixteenAdapter() });

describe("thumbor image component", () => {
  it("should set height and width when present", () => {
    const wrapper = shallow(
      <ThumborImage
        src="http://img/my-image"
        server="localhost"
        width={20}
        height={30}
      />
    );
    assert(wrapper.is("img[width=20]"));
    assert(wrapper.is("img[height=30]"));
  });

  it("should set className when present", () => {
    const wrapper = shallow(
      <ThumborImage
        src="http://img/my-image"
        server="localhost"
        width={20}
        height={30}
        className="some_class"
      />
    );
    assert(wrapper.find("img").hasClass("some_class") == true);
  });

  it("should not set height or width when not present or 0", () => {
    const notPresent = shallow(
      <ThumborImage src="http://img/my-image" server="localhost" />
    );
    assert(!notPresent.props().hasOwnProperty("height"));
    assert(!notPresent.props().hasOwnProperty("width"));

    const isZero = shallow(
      <ThumborImage
        src="http://img/my-image"
        server="localhost"
        width={0}
        height={0}
      />
    );
    assert(!isZero.props().hasOwnProperty("height"));
    assert(!isZero.props().hasOwnProperty("width"));
  });

  it("should set height and width even when they are negative, meaning they are flipped", () => {
    const negativeNumbers = shallow(
      <ThumborImage
        src="http://img/my-image"
        server="localhost"
        width={-20}
        height={-30}
      />
    );
    assert(negativeNumbers.is("img[width=20]"));
    assert(negativeNumbers.is("img[height=30]"));
  });

  it("should set the srcset with 2x and 3x by default", () => {
    const wrapper = shallow(
      <ThumborImage
        src="http://img/my-image"
        server="http://localhost"
        width={20}
        height={30}
      />
    );
    assert.equal(
      wrapper.props()["srcSet"],
      "http://localhost/unsafe/40x60/center/middle/smart/http://img/my-image 2x, http://localhost/unsafe/60x90/center/middle/smart/http://img/my-image 3x"
    );
  });

  it("should set the srcset to the sizeSet when present", () => {
    const wrapper = shallow(
      <ThumborImage
        src="http://img/my-image"
        server="http://localhost"
        width={20}
        height={30}
        sizeSet={{
          "450w": { width: 450, height: 500 },
          "800w": { width: 800, height: 1200 }
        }}
      />
    );
    assert.equal(
      wrapper.props()["srcSet"],
      "http://localhost/unsafe/450x500/center/middle/smart/http://img/my-image 450w, http://localhost/unsafe/800x1200/center/middle/smart/http://img/my-image 800w"
    );
  });
});

describe("Relative URL modes", () => {
  function wrapPolicy(policy: RelativeImgPolicy) {
    return render(
      <ThumborConfiguration relativeImgPolicy={policy} server="http://thumbor">
        <ThumborImage src="/img/my_pic.jpg" height={200} width={300} />
      </ThumborConfiguration>
    );
  }

  describe("Error mode", () => {
    it("Should raise an error if passed a relative URL", () => {
      assert.throws(() => wrapPolicy({ name: "error" }));
    });
  });

  describe("Pass along mode", () => {
    it("Should simply return the relative URL back", () => {
      const wrapper = wrapPolicy({ name: "passThrough" });
      assert.equal(wrapper.attr("src"), "/img/my_pic.jpg");
    });
  });

  describe("Prepend domain mode", () => {
    it("Should return a Thumbor URL pointing to the relative img with the domain prepended", () => {
      const wrapper = wrapPolicy({
        name: "prependOrigin",
        origin: "https://media"
      });
      assert.equal(
        wrapper.attr("src"),
        "http://thumbor/unsafe/300x200/center/middle/smart/https://media/img/my_pic.jpg"
      );
    });
  });
});
