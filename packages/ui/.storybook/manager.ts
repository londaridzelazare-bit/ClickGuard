import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

/**
 * Brands the Storybook chrome as the ClickGuard design system rather than
 * generic Storybook, and links the sidebar title back to the prototype that
 * consumes the package.
 *
 * The chrome deliberately does NOT adopt the product's own palette: a docs
 * surface that looks exactly like the product makes it hard to tell which
 * colours are decisions and which are furniture.
 */
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "ClickGuard UI",
    brandUrl: "../",
    brandTarget: "_self",
    fontBase: '"IBM Plex Sans", system-ui, sans-serif',
    fontCode: '"IBM Plex Mono", ui-monospace, monospace',
  }),
  sidebar: {
    showRoots: true,
  },
});
