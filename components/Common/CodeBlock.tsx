'use client';

import { IconCheck, IconCopy, IconDownload } from '@tabler/icons-react';
import { FC, memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import {
  generateRandomString,
  programmingLanguages,
} from '@/lib/utils/codeblock/codeblock';

interface Props {
  language: string;
  value: string;
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(
      3,
      true,
    )}${fileExtension}`;
    const fileName = window.prompt('Enter file name', suggestedFileName);

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="codeblock relative font-sans text-base w-full overflow-hidden">
      <div className="flex items-center justify-between py-1.5 px-4 overflow-hidden">
        <span className="text-xs font-semibold lowercase text-white dark:text-black">
          {language}
        </span>

        <div className="flex items-center">
          <button
            className="flex gap-1.5 items-center rounded bg-none p-1 text-xs font-light text-white dark:text-black"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <IconCheck size={14} strokeWidth={3} />
            ) : (
              <IconCopy size={14} strokeWidth={3} />
            )}
            {isCopied ? 'Copied!' : 'Copy code'}
          </button>
          <button
            className="flex items-center rounded bg-none p-1 text-xs text-white dark:text-black"
            onClick={downloadAsFile}
          >
            <IconDownload size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, fontSize: '15px' }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';
