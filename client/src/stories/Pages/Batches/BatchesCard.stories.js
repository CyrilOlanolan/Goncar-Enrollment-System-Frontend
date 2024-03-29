import { BatchesCard } from "../../../components/ComponentIndex";
import sampleBatches from "../../../components/sampleData/sampleBatches.json";

import React from "react";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Batches/BatchesCard",
  component: BatchesCard,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <BatchesCard {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = sampleBatches.Batches[0];
