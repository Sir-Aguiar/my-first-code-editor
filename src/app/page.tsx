"use client";

import { Editor, OnMount } from "@monaco-editor/react";
import { useRef } from "react";
import { editor } from "monaco-editor";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  const codeRef = useRef<editor.IStandaloneCodeEditor>(null);

  const onCodeMount: OnMount = (editor, monaco) => {
    codeRef.current = editor;
  };

  const onClick = () => {
    if (codeRef.current) {
      const code = codeRef.current.getValue();
      console.log(code);
    }
  };

  return (
    <div className="flex-1 flex">
      <Sidebar editor={codeRef} />
      <Editor height="100vh" language="javascript" theme="vs-dark" onMount={onCodeMount} />
    </div>
  );
}

