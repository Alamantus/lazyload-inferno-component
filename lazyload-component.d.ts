/// <reference types="inferno" />
import Component from "inferno-component";
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
    constructor(props: any, context: any);
    loadComponent(componentName: Type, props?: any): void;
    componentWillMount(): void;
    render(): VNode;
}
