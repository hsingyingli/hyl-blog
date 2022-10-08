import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";



interface Props {
  md: string
}

const Markdown: React.FC<Props> = ({ md }) => {
  return (
    <ReactMarkdown
      className='w-full h-full'
      remarkPlugins={[remarkGfm]}
      children={md}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
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
