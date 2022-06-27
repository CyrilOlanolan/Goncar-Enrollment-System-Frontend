import { InputField } from "../../components/ComponentIndex";

export default {
  title: "Shared/Input Field",
  component: InputField,
};

export const Email = {
  args: {
      label: "Email",
      type: "email",
      name: "email"
  },
};

export const Password = {
  args: {
      label: "Password",
      type: "password",
      name: "password"
  },
};
