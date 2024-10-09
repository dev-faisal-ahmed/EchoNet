import { SuggestedFriends } from './_ui/suggested-friends';
import { FriendRequests } from './_ui/friend-requests';
import { SentRequests } from './_ui/sent-requests';
import { AllFriends } from './_ui/all-friends';

export default function FriendsPage() {
  return (
    <main className='flex flex-col gap-6'>
      <FriendRequests />
      <SuggestedFriends />
      <SentRequests />
      <AllFriends />
    </main>
  );
}
