'use client';

import { NotificationLoader } from './_ui/NotificationLoader';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { getNotifications } from '@/helpers/data-fetching';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetNotificationSubscription } from '@/hooks';
import { getFormattedDate } from '@/helpers/dateHelper';
import { useQuery } from '@tanstack/react-query';
import { ENotificationType } from '@/lib/types';
import { TAGS } from '@/data';

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useQuery({
    queryFn: getNotifications,
    queryKey: [TAGS.NOTIFICATIONS],
  });

  useGetNotificationSubscription();

  if (isLoading) return <NotificationLoader />;

  return (
    <PageTitle title='Notifications'>
      <main className='mx-auto flex w-full max-w-2xl flex-col gap-4'>
        <h3 className='text-lg font-semibold'>Notifications.</h3>
        {notifications?.map(({ id, invoker, type, createdAt }) => (
          <div className='flex items-center gap-4 border-b p-4' key={id}>
            <div>
              <ProfileIcon name={invoker.name} />
            </div>
            <div className='flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-6'>
              <p>
                <span className='font-semibold'>{invoker.name}</span>{' '}
                {type === ENotificationType.ACCEPT_REQUEST &&
                  'just accepted your friend request'}
                {type === ENotificationType.SENT_REQUEST &&
                  'just Sent your friend request request'}
                {type === ENotificationType.MESSAGE &&
                  'just Sent you a message'}
              </p>
              <p className='text-xs text-muted-foreground md:ml-auto'>
                {getFormattedDate(createdAt)}
              </p>
            </div>
          </div>
        ))}
      </main>
    </PageTitle>
  );
}
