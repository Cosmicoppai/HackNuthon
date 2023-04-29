import { IconLayoutDashboard } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: ' ',
  // },
  {
    id: uniqueId(),
    title: 'Basic Profile',
    icon: IconLayoutDashboard,
    href: '/user/profile',
  },
  {
    id: uniqueId(),
    title: 'Scans',
    icon: IconLayoutDashboard,
    href: '/user/scans',
  },
  {
    id: uniqueId(),
    title: 'Reports',
    icon: IconLayoutDashboard,
    href: '/user/reports',
  },
  {
    id: uniqueId(),
    title: 'Past Records',
    icon: IconLayoutDashboard,
    href: '/user/records',
  },
];

export default Menuitems;
