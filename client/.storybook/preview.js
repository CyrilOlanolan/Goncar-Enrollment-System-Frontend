import "../src/styles/global.scss"

import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Green',
    values: [
      {
        name: 'Green',
        value: '#EBFBD6',
      },
      {
        name: 'white',
        value: '#FFFFFF',
      },
    ],
  },
  layout: 'fullscreen',
}