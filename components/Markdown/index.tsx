import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";




const md = `
# 什麼是Docker, Container, Image
## Introduction
Docker 是一種軟體平台，可讓您快速地建立、測試和部署應用程式。Docker 將軟體封裝到名為容器的標準化單位，其中包含程式庫、系統工具、程式碼和執行時間等執行軟體所需的所有項目。

## Container
容器是獨立執行的一個或一組應用，以及它們的執行態環境

### Before container

  * Installation process different on each OS environment
    * Many steps where something could go wrong
      * Version Control problem

在team裡的所有開發者都需要在本地install、configure 所需的service。當project越來越大，所要安裝配置的service會越來越多。
![](https://i.imgur.com/Q8rHVIf.png)

### After container

* Container own isolated environment
* Packaged with all needed configuration
  * One command to install the app

所有所需的services都打包好在一個container，開發人員只需從container repository下載就好。
![](https://i.imgur.com/3Sz3s0f.png)

~~A strikethrough text~~
- [ ] Task list 1
  - [ ] Pending task list 2
  - [x] Completed task list 3
  - [x] Completed task list 4

~~~css
.container{
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}
 
.child-1{
  background-color: red;
}
 
.child-2{
  background-color: blue;
}
 
~~~
`

const Markdown: React.FC = () => {
  return (
    <div>
      <ReactMarkdown
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

    </div>
  )
}

export default Markdown
