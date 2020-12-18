export class DialogData {
    constructor(component?: string) {
        this.componentName = component;
    }
    componentName: string;
    title: string;
    text: string;
}
