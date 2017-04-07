import Component from "inferno-component";
import { VNode } from "inferno";
export interface ILazyLoaderProps {
    lazyLoad: (componentName: Component<any, any> | string, context: any) => void;
    children: VNode | VNode[];
    context: any;
    path: string;
    params: string;
}
export default class LazyLoader extends Component<ILazyLoaderProps, any> {
    lazyLoad: (callback: Function, context: any) => void;
    props: ILazyLoaderProps;
    state: {
        child: VNode | null;
    };
    children: any;
    context: any;
    constructor(props: any, context: any);
    loadComponent(componentName: Component<any, any>, props?: any): void;
    componentWillMount(): void;
    render(): VNode;
}
