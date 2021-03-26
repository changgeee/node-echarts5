/// <reference types="node" />
interface Options {
    width: number;
    height: number;
    path?: string;
    options: any;
    enableAutoDispose?: boolean;
}
declare const _default: (config: Options) => Buffer | undefined;
export default _default;
