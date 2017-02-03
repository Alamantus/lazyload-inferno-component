import infernoTestUtils from "inferno-test-utils";
import c from "inferno-create-element";
import LazyLoad from "../../";

function setState(object, cb?) {
  for (let p in object) {
    this.state[p] = object[p];
  }
  return true;
}

function cycle(component) {
  component.setState = setState.bind(component);
  component.componentWillMount();
}

describe("LazyLoader", () => {
  it("should have no children", () => {
    let component = c(LazyLoad, null, null);
    expect(component.props.children).toBe(null);
  });

  it("creates a child node", () => {
    let component = new LazyLoad(
      {
        lazyLoad: (callback) => {
          callback("div");
        }
      },
      {router: null}
    );

    cycle(component);

    expect(infernoTestUtils.isElement(component.state.child)).toBe(true);
    expect(component.state.child.type).toEqual("div");
  });

  it("should pass its children down to the child node", () => {
    let component = new LazyLoad(
      {
        lazyLoad: (callback) => {
          callback("div");
        },
        children: c("div", null, "hello")
      },
      {router: null}
    );

    cycle(component);

    expect(component.state.child.children).toBeDefined();
  });

  it("should pass its props down to the child node", () => {
    let component = new LazyLoad(
      {
        lazyLoad: (callback) => {
          callback("div");
        },
        children: c("div", null, "hello"),
        className: "classy"
      },
      {router: null}
    );

    cycle(component);

    expect((component.state.child.props as any).className).toEqual("classy");
  });

  it("should apply additional props to the child node", () => {
    let component = new LazyLoad(
      {
        lazyLoad: (callback) => {
          callback("div", {otherProp: "other"});
        },
        children: c("div", null, "hello"),
        className: "classy"
      },
      {router: null}
    );

    cycle(component);

    let child = component.state.child;
    expect((child.props as any).otherProp).toEqual("other");
    expect((child.props as any).className).toEqual("classy");
  });

  it("should return the child node on render", () => {
    let component = new LazyLoad(
      {
        lazyLoad: (callback) => {
          callback("div", {otherProp: "other"});
        },
      },
      {router: null}
    );

    cycle(component);

    expect(infernoTestUtils.isElement(component.render())).toBe(true);
    expect(component.render().type).toEqual("div");
  });
});