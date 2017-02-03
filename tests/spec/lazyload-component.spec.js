"use strict";
var inferno_test_utils_1 = require("inferno-test-utils");
var inferno_create_element_1 = require("inferno-create-element");
var _1 = require("../../");
function setState(object, cb) {
    for (var p in object) {
        this.state[p] = object[p];
    }
    return true;
}
function cycle(component) {
    component.setState = setState.bind(component);
    component.componentWillMount();
}
describe("LazyLoader", function () {
    it("should have no children", function () {
        var component = inferno_create_element_1.default(_1.default, null, null);
        expect(component.props.children).toBe(null);
    });
    it("creates a child node", function () {
        var component = new _1.default({
            lazyLoad: function (callback) {
                callback("div");
            }
        }, { router: null });
        cycle(component);
        expect(inferno_test_utils_1.default.isElement(component.state.child)).toBe(true);
        expect(component.state.child.type).toEqual("div");
    });
    it("should pass its children down to the child node", function () {
        var component = new _1.default({
            lazyLoad: function (callback) {
                callback("div");
            },
            children: inferno_create_element_1.default("div", null, "hello")
        }, { router: null });
        cycle(component);
        expect(component.state.child.children).toBeDefined();
    });
    it("should pass its props down to the child node", function () {
        var component = new _1.default({
            lazyLoad: function (callback) {
                callback("div");
            },
            children: inferno_create_element_1.default("div", null, "hello"),
            className: "classy"
        }, { router: null });
        cycle(component);
        expect(component.state.child.props.className).toEqual("classy");
    });
    it("should apply additional props to the child node", function () {
        var component = new _1.default({
            lazyLoad: function (callback) {
                callback("div", { otherProp: "other" });
            },
            children: inferno_create_element_1.default("div", null, "hello"),
            className: "classy"
        }, { router: null });
        cycle(component);
        var child = component.state.child;
        expect(child.props.otherProp).toEqual("other");
        expect(child.props.className).toEqual("classy");
    });
    it("should return the child node on render", function () {
        var component = new _1.default({
            lazyLoad: function (callback) {
                callback("div", { otherProp: "other" });
            },
        }, { router: null });
        cycle(component);
        expect(inferno_test_utils_1.default.isElement(component.render())).toBe(true);
        expect(component.render().type).toEqual("div");
    });
});
