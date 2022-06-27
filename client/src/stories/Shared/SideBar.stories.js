import { SideBar } from '../../components/ComponentIndex';
import sampleNavigation from '../sampleData/sampleNavigation.json'

export default {
  title: 'Shared/SideBar',
  component: SideBar,
};

export const Main = {
  args: {
    navigation: sampleNavigation.navigation
  }
};