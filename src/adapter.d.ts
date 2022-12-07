declare function addStyle(style: string);

declare class StyleClass {
    static readonly default: Object;
    static css(style: any): string;
    static style(style: any): string;
}

declare class Adapter {
    static Style: StyleClass;
    static tagName: string;
    static define(tagName: string): void;
    static initStyle(style?: any): void;
    static tagStyle(style?: string | Object): void;
    static classStyle(class_: string, style?: string | Object): void;
    _class: any | Adapter;
    constructor();
    addStyle(style?: any): void;
    notify(name: string, options: object): void;
}