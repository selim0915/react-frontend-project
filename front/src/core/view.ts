export default abstract class View {
  private template: string;

  private renderTemplate: string;

  private container: HTMLElement;

  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const conatinerElement: HTMLElement | null = document.getElementById(containerId);

    if (!conatinerElement) {
      throw new Error('No containerElement');
    }

    this.container = conatinerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('');
    this.clearHtmlList();
    return snapshot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  abstract render(...params: string[]): void;
}
