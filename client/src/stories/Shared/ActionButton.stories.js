import { ActionButton } from '../../components/ComponentIndex';

export default {
  title: 'Shared/Action Button',
  component: ActionButton,
  parameters: {
    backgrounds: {
      default: "white"
    },
    layout: "centered"
  }
};

export const ViewDefault = {
  args: {
    label: "View",
    variant: "view"
  }
};

export const ViewIcon = {
  args: {
    variant: "view",
  }
};

export const EditDefault = {
  args: {
    label: "Edit",
    variant: "edit",
  }
};

export const EditIcon = {
  args: {
    variant: "edit",
  }
};

export const DeleteDefault = {
  args: {
    label: "Delete",
    variant: "delete",
  }
};

export const DeleteIcon = {
  args: {
    variant: "delete",
  }
};

export const PrintIcon = {
  args: {
    variant: "print",
  }
};

export const DisableIcon = {
  args: {
    variant: "disable",
  }
};