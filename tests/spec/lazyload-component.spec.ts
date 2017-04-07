import infernoTestUtils from "inferno-test-utils";
import c from "inferno-create-element";
import LazyLoad from "../../";
import {VNode} from "inferno";

describe("LazyLoader", () => {

  it("creates a child node", () => {
    let component = c(
      LazyLoad,
      {
        lazyLoad: (cb) => {
          cb("div");
        }
      },
      null
    );

    const rendered: any = infernoTestUtils.renderIntoDocument(component);
    const found: any = infernoTestUtils.findRenderedVNodeWithType(rendered, LazyLoad).children;

    expect(found.state.child.type).toEqual("div");
  });

  it("passes its children down to the child node", () => {
    let component  = c(
      LazyLoad,
      {
        lazyLoad: (cb) => {
          cb("div");
        }
      },
      c("div", { className: "hello" })
    );

    const rendered: any = infernoTestUtils.renderIntoDocument(component);

    const found: any = infernoTestUtils.findRenderedVNodeWithType(rendered, LazyLoad).children;

    expect(found.state.child.children.className).toEqual("hello");
  });

  it("passes its props down to the child node", () => {
    let component = c(
      LazyLoad,
      {
        lazyLoad: (callback) => {
          callback("div")
        },
        className: "classy",
        test: 5
      },
      null
    );

    const rendered: any = infernoTestUtils.renderIntoDocument(component);

    const found: any = infernoTestUtils.findRenderedVNodeWithType(rendered, LazyLoad).children;

    expect(found.state.child.className).toEqual("classy");
    expect(found.state.child.props.test).toEqual(5);
  });

  it("applies additional props passed in the callback to the child node", () => {
    let component = c(
      LazyLoad,
      {
        lazyLoad: (callback) => {
          callback("div", { otherProp: "other" });
        },
        className: "classy",
        test: 5
      },
      null
    );

    const rendered: any = infernoTestUtils.renderIntoDocument(component);
    const found: any = infernoTestUtils.findRenderedVNodeWithType(rendered, LazyLoad).children;

    expect(found.state.child.props.otherProp).toEqual("other");
  });

  it("returns the child node on render", () => {
    let component: VNode = c(
      LazyLoad,
      {
        lazyLoad: (callback) => {
          callback("button", { disabled: true });
        },
        className: "classy",
        test: 5
      }
    );

    const rendered: any = infernoTestUtils.renderIntoDocument(component);
    const found: any = infernoTestUtils.findRenderedVNodeWithType(rendered, LazyLoad).children;

    expect(found.render().dom.disabled).toBe(true);
  });
});