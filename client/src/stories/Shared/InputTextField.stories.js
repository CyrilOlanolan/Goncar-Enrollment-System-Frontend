import { InputTextField } from '../../components/ComponentIndex';

export default {
  title: 'Shared/Input Text Field',
  component: InputTextField,
};

export const Main = {
  args: {
    label: "First Name"
  }
};

export const Email = {
  args: {
    label: "Email",
    type: "email",
  }
};
