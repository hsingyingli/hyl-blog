import React from "react";
import Editor from "react-ace";
import useTheme from "../../hooks/useTheme";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/theme-gruvbox_light_hard";
import "ace-builds/src-noconflict/ext-language_tools";


interface Props {
  value: string
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

const AceEditor: React.FC<Props> = ({ value, onChange }) => {
  const { theme } = useTheme()

  return (
    <Editor
      mode="markdown"
      theme={`gruvbox_${theme}_hard`}
      value={value}
      onChange={onChange}
      name="markdown-editor"
      editorProps={{ $blockScrolling: true }
      }
      height="100%"
      width="100%"
      fontSize="18px"
    />
  )
}

export default AceEditor 
