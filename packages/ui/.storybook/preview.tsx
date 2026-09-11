import type { Preview, Decorator } from "@storybook/react";
import React from "react";

import "../src/styles/tokens.css";
import "../src/styles/base.css";
import "./storybook.css";

const withScope: Decorator = (Story) => (
  <div className="cg-root" style={{ padding: 24 }}>
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withScope],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "page",
      values: [
        { name: "page", value: "#f9f9f7" },
        { name: "raised", value: "#ffffff" },
        { name: "canvas", value: "#e9e9e5" },
      ],
    },
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Introduction", "Color", "Typography", "Spacing and radii"],
          "Primitives",
          "Threat monitoring",
        ],
      },
    },
  },
};

export default preview;
