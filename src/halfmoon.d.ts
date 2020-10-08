declare module "halfmoon" {
    /** Toggle dark mode. This also updates the cookie. */
    export function toggleDarkMode(): void;

    /** Toggle the sidebar. */
    export function toggleSidebar(): void;

    /** Deactivate all the dropdown toggles when another one is active. */
    export function deactivateAllDropdownToggles(): void;
}
