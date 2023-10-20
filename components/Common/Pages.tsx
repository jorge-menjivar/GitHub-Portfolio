import { cn } from '@/lib/utils';

export const Body = ({ children, ...props }: any) => (
  <div
    className="flex flex-col h-full pt-12 pb-6 w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 mx-auto"
    {...props}
  >
    {children}
  </div>
);

export const Content = ({ children, className, ...props }: any) => (
  <div
    className={cn(
      'prose flex flex-col px-4 items-center justify-center w-full',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
