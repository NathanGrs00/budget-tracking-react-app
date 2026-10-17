/** Months are identified by a "YYYY-MM" key, which also sorts chronologically. */

export function monthKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function currentMonthKey(): string {
    return monthKey(new Date());
}

export function isMonthKey(value: string): boolean {
    return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}

export function shiftMonth(key: string, delta: number): string {
    const [year, month] = key.split("-").map(Number);
    return monthKey(new Date(year, month - 1 + delta, 1));
}

export function formatMonth(key: string, style: "long" | "short" = "long"): string {
    const [year, month] = key.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: style, year: "numeric" });
}
