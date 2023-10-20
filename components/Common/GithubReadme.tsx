'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Markdown from 'react-markdown';

import {
  getGithubPostsRepo,
  getGithubUsername,
} from '@/lib/utils/env-variables/constants';

import { CodeBlock } from './CodeBlock';

import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const GithubMarkdown = ({
  projectName,
  postName,
}: {
  projectName?: string;
  postName?: string;
}) => {
  const ghUsername = getGithubUsername();

  let url = '';
  if (projectName) {
    url = `https://raw.githubusercontent.com/${ghUsername}/${projectName}/main/README.md`;
  } else if (postName) {
    const ghPostsRepo = getGithubPostsRepo();
    url = `https://raw.githubusercontent.com/${ghUsername}/${ghPostsRepo}/main/posts/${postName}.md`;
  }

  const [markdownContent, setMarkdownContent] = useState('');
  const fetchMarkdown = useCallback(async () => {
    const response = await fetch(url);

    if (!response.ok) {
      return;
    }

    const _content = await response.text();

    setMarkdownContent(_content);
  }, [url]);

  useEffect(() => {
    fetchMarkdown();
  }, [fetchMarkdown]);

  return (
    <Markdown
      className="prose prose-sm prose-stone items-start w-full max-w-full flex-1 bg-transparent overflow-hidden"
      remarkPlugins={[remarkGfm, remarkMath]}
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return (
                <span className="animate-pulse cursor-default mt-1">▍</span>
              );
            }

            children[0] = (children[0] as string).replace('`▍`', '▍');
          }

          const match = /language-(\w+)/.exec(className || '');

          return !inline ? (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ''}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        table({ children }) {
          return (
            <div className="flex overflow-auto">
              <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="break-words border border-black px-3 py-1 dark:border-white">
              {children}
            </td>
          );
        },
        a({ children, ...props }) {
          return (
            <a {...props} className="underline text-blue-800">
              {children}
            </a>
          );
        },
        img({ src, alt, width, height }) {
          // We need to check if the path is relative or not.
          // If it is relative, we need to prepend the base url.
          // If it is not relative, we just return the src.
          if (src?.startsWith('/') || src?.startsWith('./')) {
            src = `https://github.com/${ghUsername}/${projectName}/raw/main/${src}`;
          }

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src!} alt={alt!} className="m-1 overflow-clip inline" />
          );
        },
        h1({ children, id, ...props }) {
          if (!id) {
            // Generate an id from the title.
            id = children
              .toString()
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '');
          }
          return (
            <h1 className="text-3xl font-bold mt-4 mb-2" id={id} {...props}>
              {children}
            </h1>
          );
        },
        h2({ children, id, ...props }) {
          if (!id) {
            // Generate an id from the title.
            id = children
              .toString()
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '');
          }
          return (
            <h2 className="text-2xl font-bold mt-4 mb-2" id={id} {...props}>
              {children}
            </h2>
          );
        },
        h3({ children, id, ...props }) {
          if (!id) {
            // Generate an id from the title.
            id = children
              .toString()
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '');
          }
          return (
            <h3 className="text-lg font-bold mt-4 mb-2" id={id} {...props}>
              {children}
            </h3>
          );
        },
        h4({ children, id, ...props }) {
          if (!id) {
            // Generate an id from the title.
            id = children
              .toString()
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '');
          }
          return (
            <h4 className="text-base font-bold mt-4 mb-2" id={id} {...props}>
              {children}
            </h4>
          );
        },
        pre({ children }) {
          return <pre className="flex overflow-auto w-full">{children}</pre>;
        },
      }}
    >
      {markdownContent}
    </Markdown>
  );
};
