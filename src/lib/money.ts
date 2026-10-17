export const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "JPY", "CAD", "AUD", "SEK", "NOK", "DKK", "PLN", "INR"];
export const DEFAULT_CURRENCY = "EUR";

/** Parses user input, accepting both "12.50" and "12,50". Invalid or negative input counts as 0. */
export function parseAmount(value: string): number {
    const n = parseFloat(value.replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : 0;
}

export function formatMoney(value: number, currency: string): string {
    try {
        return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
    } catch {
        return value.toFixed(2);
    }
}
