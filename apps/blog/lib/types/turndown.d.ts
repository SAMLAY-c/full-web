declare module 'turndown' {
  interface TurndownServiceOptions {
    headingStyle?: 'setext' | 'atx';
    hr?: string;
    bulletListMarker?: '*' | '+' | '-';
    codeBlockStyle?: 'indented' | 'fenced';
    fence?: '```' | '~~~';
    emDelimiter?: '_' | '*';
    strongDelimiter?: '__' | '**';
    linkStyle?: 'inlined' | 'referenced';
    linkReferenceStyle?: 'full' | 'collapsed' | 'shortcut';
  }

  class TurndownService {
    constructor(options?: TurndownServiceOptions);
    turndown(html: string): string;
    addRule(name: string, rule: {
      filter: string | string[] | ((node: HTMLElement) => boolean);
      replacement: (content: string, node: HTMLElement, options: TurndownServiceOptions) => string;
    }): void;
    use(plugin: (turndown: TurndownService) => void): void;
  }

  export = TurndownService;
}

declare module 'turndown-plugin-gfm' {
  import TurndownService from 'turndown';
  export function gfm(turndown: TurndownService): void;
}
