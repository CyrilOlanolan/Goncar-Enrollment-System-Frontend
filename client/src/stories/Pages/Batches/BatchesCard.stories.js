import { BatchesCard } from "../../../components/ComponentIndex";
import sampleBatches from "../../../components/sampleData/sampleBatches.json";

// export default {
//   title: 'Batches/Batches Card',
//   component: BatchesCard,
// };

// export const Main = {
//   args: {
//     props: {
//       batchID: sampleBatches.Batches[0].batchID,
//       batchName: sampleBatches.Batches[0].batchName
//     }
//   }
// };

import React from "react";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "BatchesCard",
  component: BatchesCard,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <BatchesCard {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
  batchID: 0,
  batchName: "Agila",
  batchIdentifier: "03-2021-1234",
  batchTeacher: "Pawaon, Louis Miguel D.",
  batchPopulation: 26,
  batchMaxPopulation: 30,
  label: "Button",
};
