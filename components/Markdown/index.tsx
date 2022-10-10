import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeProps } from "react-markdown/lib/ast-to-react";
import useTheme from '../../hooks/useTheme'


interface Props {
  md: string
}

const Markdown: React.FC<Props> = ({ md }) => {
  const { theme } = useTheme()
  return (
    <ReactMarkdown
      className='prose prose-lg max-w-none w-full h-full p-2 dark:prose-invert'
      remarkPlugins={[remarkGfm]}
      children={md}
      components={{
        code({ node, inline, className, style, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={theme === 'dark' ? dark : undefined}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  )
}

export default Markdown
