import { describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.tsx";
import { STORAGE_KEY } from "./lib/storage.ts";

async function goTo(page: string) {
    await act(async () => {
        window.location.hash = `/${page}`;
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
}

describe("App", () => {
    it("adds income and keeps it after a reload", async () => {
        const user = userEvent.setup();
        await goTo("income");
        const { unmount } = render(<App />);

        await user.click(screen.getByRole("button", { name: "+ Add income" }));
        await user.type(screen.getByLabelText("Name of income 1"), "Salary");
        await user.type(screen.getByLabelText("Amount of income 1"), "2500");
        expect(screen.getByTestId("total-income").textContent).toMatch(/2,500\.00|2\.500,00/);
        expect(localStorage.getItem(STORAGE_KEY)).toContain("Salary");

        unmount();
        render(<App />);
        expect(screen.getByLabelText("Name of income 1")).toHaveProperty("value", "Salary");
    });

    it("removes a row", async () => {
        const user = userEvent.setup();
        await goTo("expenses");
        render(<App />);
        await user.click(screen.getByRole("button", { name: "+ Add expense" }));
        await user.click(screen.getByRole("button", { name: "Remove expense 1" }));
        expect(screen.queryByLabelText("Name of expense 1")).toBeNull();
    });

    it("shows a friendly message on the budget page without data", async () => {
        await goTo("budget");
        render(<App />);
        expect(screen.getByText(/Nothing filled in/)).toBeTruthy();
    });
});
