import { SentRequests } from './_ui/sent-requests';
import { SuggestedFriends } from './_ui/suggested-friends';

export default function FriendsPage() {
  return (
    <main>
      <SuggestedFriends />
      <SentRequests />
    </main>
  );
}
