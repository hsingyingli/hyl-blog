import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import NoteLayout from "../../components/Layout/NoteLayout";
const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

const Notes: React.FC = () => {
  const welcome = useMemo(() => `---
# ***Hello Friend!***
> This is a simple markdown notebook
- [x] Write, Edit, Save, Delete your own note
- [x] Dark theme support
---`, [])

  return (
    <NoteLayout>
      <Markdown md={welcome} />
    </NoteLayout>
  )
}

export default Notes
