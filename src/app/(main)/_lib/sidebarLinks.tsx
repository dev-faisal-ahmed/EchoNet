import {
  MessageSquareIcon,
  LayoutGridIcon,
  UsersIcon,
  BellIcon,
  TrashIcon,
} from 'lucide-react';

export const sidebarLinks = [
  { title: 'Feed', icon: <LayoutGridIcon size={20} />, url: '/' },
  { title: 'Friends', icon: <UsersIcon size={20} />, url: '/friends' },
  { title: 'Chats', icon: <MessageSquareIcon size={20} />, url: '/chats' },
  {
    title: 'Notifications',
    icon: <BellIcon size={20} />,
    url: '/notifications',
  },
  { title: 'Trash', icon: <TrashIcon size={20} />, url: '/trash' },
];
