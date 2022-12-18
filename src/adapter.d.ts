export declare function addStyle(ts: TemplateStringsArray, ...strings);

export declare function define(tagName: string, Class: any):void;

export declare class StyleClass {
    static readonly default: object;
    static css(style: any): string;
    static style(style: any): string;
}

export declare class Adapter {
    static Style: StyleClass;
    static tagName: string;
    static define(tagName: string): void;
    static initStyle(style?: string | Object): void;
    static tagStyle(style: string | Object): void;
    static classStyle(class_: string, style: string | Object): void;
    addStyle(style: string | Object): void;
    notify(name: string, options: object): void;
}