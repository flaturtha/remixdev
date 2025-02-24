interface KlaviyoLearnQ extends Array<any> {
  push(args: any[]): number;
}

declare global {
  interface Window {
    dataLayer: any[];
    _learnq: KlaviyoLearnQ;
  }
}

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
}

export {}; 