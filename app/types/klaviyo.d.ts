interface KlaviyoLearnQ extends Array<any> {
  push(args: any[]): number;
}

declare global {
  interface Window {
    _learnq: KlaviyoLearnQ;
  }
}

export {}; 