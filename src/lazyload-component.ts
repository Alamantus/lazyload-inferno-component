import createElement from "inferno-create-element";
import Component from "inferno-component";

/** @internal */
function rest(object: Object, excluded: string[]): Object {
  const t = {};
  for (let p in object) {
    if (excluded.indexOf(p) < 0) {
      t[p] = object[p];
    }
  }
  return t;
}

export interface ILazyLoaderProps {
  lazyLoad: (componentName: Type | string, context: any) => void;
  children: VNode | VNode[];
  context: any;
}

export default class LazyLoader extends Component<ILazyLoaderProps, any> {

  lazyLoad: (componentName: any, context: any) => void;
  props: ILazyLoaderProps;
  state: {
    child: VNode | null;
  };
  children: any;
  context: any;

  constructor(props, context) {
    super(props, context);
    this.state = {
      child: null
    };
    this.context = context;
    this.lazyLoad = props.lazyLoad;
    this.children = props.children;
    this.loadComponent = this.loadComponent.bind(this);
  }

  loadComponent(componentName: Type, props?: any) {
    let finalProps;
    if (!props) {
      finalProps = rest(this.props, ["lazyLoad", "children"]);
    } else {
      finalProps = Object.assign({}, props, rest(this.props, ["lazyLoad", "children"]));
    }

    this.setState({
      child: createElement(componentName, finalProps, this.children)
    });
  }

  componentWillMount() {
    this.lazyLoad(this.loadComponent, {props: this.props, router: this.context.router});
  }

  render() {
    return this.state.child ? this.state.child : null;
  }
}