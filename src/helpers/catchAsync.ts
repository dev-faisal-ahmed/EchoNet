import { toast } from 'sonner';

interface CatchAsyncArgs {
  id?: string | number;
  tryFn: () => void;
  catchFn?: (error: unknown) => void;
  finallyFn?: () => void;
}

export const catchAsync = async ({
  finallyFn,
  catchFn,
  tryFn,
  id,
}: CatchAsyncArgs) => {
  return Promise.resolve(tryFn())
    .catch((error) => {
      if (catchFn) return catchFn(error);

      // default error handler
      let message = 'Something went wrong';
      if (error instanceof Error) message = error.message;
      toast.error(message, { id });
    })
    .finally(() => {
      if (finallyFn) return finallyFn();
    });
};
