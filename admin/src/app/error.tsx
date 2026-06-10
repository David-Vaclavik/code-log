"use client";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  // test
  // console.log(error);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <h2 className="text-3xl font-bold">Oh no!</h2>
        <p className="my-2 mb-10">
          There was an issue. This could be a temporary issue, please try your action again.
        </p>
        <button
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-[550] py-3 px-4 rounded-md hover:bg-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:bg-primary/50"
          onClick={() => unstable_retry()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
