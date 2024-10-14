import {
  MessageSquareIcon,
  LayoutGridIcon,
  UsersIcon,
  BellIcon,
  UserIcon,
  TrashIcon,
} from 'lucide-react';

export const sidebarLinks = [
  { title: 'Feed', icon: <LayoutGridIcon size={20} />, url: '/' },
  { title: 'Friends', icon: <UsersIcon size={20} />, url: '/friends' },
  { title: 'Chats', icon: <MessageSquareIcon size={20} />, url: '/chats' },
  { title: 'Profile', icon: <UserIcon size={20} />, url: '/profile' },
  {
    title: 'Notifications',
    icon: <BellIcon size={20} />,
    url: '/notifications',
  },
  { title: 'Trash', icon: <TrashIcon size={20} />, url: '/trash' },
];
