import { EmployeeProfileCreation } from "../../../components/ComponentIndex";

import React from "react";

export default {
  title: "Employees/Employee Profile Creation",
  component: EmployeeProfileCreation,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <EmployeeProfileCreation {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
