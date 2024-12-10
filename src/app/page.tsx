"use client";

import { Editor, OnMount } from "@monaco-editor/react";
import { useRef } from "react";
import { editor } from "monaco-editor";
import Sidebar from "@/components/Sidebar/Sidebar";
import dynamic from "next/dynamic";

export default function Home() {
  const codeRef = useRef<editor.IStandaloneCodeEditor>(null);

  const onCodeMount: OnMount = (editor, monaco) => {
    codeRef.current = editor;
  };

  return (
    <div className="flex-1 flex">
      <Sidebar editor={codeRef} />
      <Editor
        height="100vh"
        language="javascript"
        theme="vs-dark"
        onMount={onCodeMount}
        options={{
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
}

