import { DashboardCards } from '../../../components/ComponentIndex';
import sampleNavigation from '../../sampleData/sampleNavigation.json'

export default {
  title: 'Dashboard/Dashboard Cards',
  component: DashboardCards,
};

export const Main = {
  args: {
    navigation: sampleNavigation.navigation
  }
};