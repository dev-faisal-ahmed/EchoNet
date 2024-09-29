interface CatchAsyncArgs {
  id?: string;
  tryFn: () => void;
  catchFn?: (error: unknown) => void;
  finallyFn?: () => void;
}

export async function catchAsync({
  finallyFn,
  catchFn,
  tryFn,
}: CatchAsyncArgs) {
  return Promise.resolve(tryFn())
    .catch((error) => {
      if (catchFn) return catchFn(error);
    })
    .finally(() => {
      if (finallyFn) return finallyFn();
    });
}
