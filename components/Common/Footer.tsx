import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-12 border-t border-gray-200 dark:border-gray-800 shrink-0">
      {process.env.NEXT_PUBLIC_FOOTER && (
        <div className="flex flex-row items-center justify-center gap-x-2">
          <Image
            src="/favicon-16x16.png"
            alt="Logo"
            width={16}
            height={16}
            className="rounded-sm"
          />
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {process.env.NEXT_PUBLIC_FOOTER}
          </span>
        </div>
      )}
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {`Powered by `}{' '}
        <a
          className="text-blue-500 hover:text-blue-600"
          href="https://github.com/jorge-menjivar/GithubPortfolio"
          target="_blank"
        >
          GitHub Portfolio
        </a>
      </span>
    </footer>
  );
};
