export class DialogData {
    constructor(component?: string) {
        this.componentName = component || '';
        this.show = !!component;
    }
    componentName: string;
    title: string;
    text: string;
    wide: boolean;
    show: boolean;
    src: string;
    innerTitle: string;
    callBackDialog: any;
    dynamicObject:unknown;
    close() {
        this.show = false;
    }
}
