import { SendHorizontalIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ChatPage() {
  return (
    <div className='flex h-[90vh] w-full flex-col items-center justify-end'>
      <h3>Please Select a conversation to see details</h3>
      <div className='relative mt-6 w-full'>
        <Input placeholder='Write Something' />
        <span className='absolute right-0 top-1/2 -translate-y-1/2 rounded-md bg-primary p-2'>
          <SendHorizontalIcon size={20} />
        </span>
      </div>
    </div>
  );
}
