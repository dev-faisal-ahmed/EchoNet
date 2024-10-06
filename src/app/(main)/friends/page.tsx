import { SuggestedFriends } from './_ui/suggested-friends';
import { FriendRequests } from './_ui/friend-requests';
import { SentRequests } from './_ui/sent-requests';

export default function FriendsPage() {
  return (
    <main>
      <FriendRequests />
      <SuggestedFriends />
      <SentRequests />
    </main>
  );
}
