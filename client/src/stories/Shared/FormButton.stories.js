import { FormButton } from '../../components/ComponentIndex';

export default {
  title: 'Shared/Components/Form Button',
  component: FormButton,
  parameters: {
    backgrounds: {
      default: "white"
    },
    layout: "centered"
  }
};

export const Submit = {
  args: {
    label: "Submit"
  }
};

export const Cancel = {
  args: {
    label: "Cancel",
    variant: "cancel"
  }
};