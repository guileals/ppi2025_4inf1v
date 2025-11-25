export declare const HAN_NUMERALS: string[];
export declare const ARABIC_NUMERALS: string[];
export declare const PERCENTAGES: string[];
export declare const ARABIC_RE: RegExp;
export declare const HAN_RE: RegExp;
export declare const PERCENT_RE: RegExp;
export declare function getNumberLocaleDetails(locale?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): Partial<Record<keyof Intl.NumberFormatPartTypeRegistry, string | undefined>>;
export declare function parseNumber(formattedNumber: string, locale?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): number | null;