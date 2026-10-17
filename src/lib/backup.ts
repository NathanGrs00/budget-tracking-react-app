import type { AppData } from "../types.ts";
import { parseData } from "./storage.ts";

export function downloadBackup(data: AppData): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `budget-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

/** Reads and validates a backup file. Throws if it is not a budget backup. */
export async function readBackup(file: File): Promise<AppData> {
    return parseData(JSON.parse(await file.text()));
}
