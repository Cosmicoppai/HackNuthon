import { IconLayoutDashboard } from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuItemsBeforeScan = [
  // {
  //   navlabel: true,
  //   subheader: ' ',
  // },
  {
    id: uniqueId(),
    title: 'Staffs',
    icon: IconLayoutDashboard,
    href: '/hospital/addStaff',
  },
  {
    id: uniqueId(),
    title: 'Doctors',
    icon: IconLayoutDashboard,
    href: '/hospital/addDoc',
  },
  {
    id: uniqueId(),
    title: 'Checkups',
    icon: IconLayoutDashboard,
    href: '/hospital/checkups',
  },
  {
    id: uniqueId(),
    title: 'Scans',
    icon: IconLayoutDashboard,
    href: '/hospital/scan',
  },
];

export default MenuItemsBeforeScan;
