import { cn } from '@/lib/utils';

export const Title = ({ children, className, ...props }: any) => (
  <h1 className={cn('m-4 mb-3 text-3xl w-full', className)} {...props}>
    {children}
  </h1>
);

export const TitleLink = ({ children, ...props }: any) => (
  <span
    className="inline hover:animation: bg-gradient-to-bl 
  from-[#af0ae9] to-[#2684e2] bg-clip-text text-transparent
  bg-200%"
    {...props}
  >
    {children}
  </span>
);
export const Subtitle = ({ children, className, ...props }: any) => (
  <p className={cn('m-3 text-lg', className)} {...props}>
    {children}
  </p>
);
