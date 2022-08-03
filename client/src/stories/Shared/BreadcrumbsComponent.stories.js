import { BreadcrumbsComponent } from '../../components/ComponentIndex';

export default {
  title: 'Shared/Breadcrumbs Component',
  component: BreadcrumbsComponent,
};

export const Main = {
  args: {
    routes: [
      {
        label: "Route 1",
        href: "/",
        onClick: () => console.log("Hi")
      },
      {
        label: "Route 2",
        href: "/",
      },
      {
        label: "Route 3",
      }
    ]
  }
};