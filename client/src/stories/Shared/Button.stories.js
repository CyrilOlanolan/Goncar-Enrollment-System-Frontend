import { Button } from "../../components/ComponentIndex";

export default {
  title: "Shared/Button",
  component: Button,
};

export const SignIn = {
  args: {
      label: "Sign In",
      type: "button",
      variant: "SignIn"
  },
};

export const WithIcon = {
  args: {
      label: "Sign Out",
      type: "button",
      variant: "SignOut",
      icon: "logoutIcon",
      iconSize: "24"
  },
};
