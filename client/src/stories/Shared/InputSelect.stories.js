import { InputSelect } from '../../components/ComponentIndex';

export default {
  title: 'Shared/Input Select',
  component: InputSelect,
};

export const Main = {
  args: {
    label: "Educational Attainment",
    options: [
      "Highschool Graduate",
      "College Graduate",
      "Undergraduate"
    ]

  }
};