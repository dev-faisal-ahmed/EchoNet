import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { useDeletePost } from './useDeletePost';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

interface IProps {
  postId: string;
}

export function DeletePost({ postId }: IProps) {
  const {
    states: { isDialogOpen, setIsDialogOpen },
    handleDeletePost,
    isPending,
  } = useDeletePost();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <span className='block cursor-pointer rounded-md bg-red-600 p-2'>
          <TrashIcon size={18} />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Once you delete this post it can be found in trash folder
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => handleDeletePost(postId)}
            disabled={isPending}
            variant='destructive'
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
