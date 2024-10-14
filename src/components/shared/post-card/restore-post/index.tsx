'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useRestorePost } from './useRestorePost';
import { Button } from '@/components/ui/button';
import { RotateCcwIcon } from 'lucide-react';

interface IProps {
  postId: string;
}

export function RestorePost({ postId }: IProps) {
  const {
    states: { isDialogOpen, setIsDialogOpen },
    handlePostRestore,
    isPending,
  } = useRestorePost();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <span className='block cursor-pointer rounded-md bg-green-600 p-2'>
          <RotateCcwIcon size={18} />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Once you restore this post it can be found in the feed page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => handlePostRestore(postId)}
            disabled={isPending}
          >
            {isPending ? 'Restoring...' : 'Restore'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
