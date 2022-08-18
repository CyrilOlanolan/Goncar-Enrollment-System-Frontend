import { BatchesCreation } from "../../../components/ComponentIndex";

import React from "react";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Batches/Batches Creation",
  component: BatchesCreation,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <BatchesCreation {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
