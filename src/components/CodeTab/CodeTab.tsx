import React, { useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { editor } from "monaco-editor";
import { Editor, OnMount } from "@monaco-editor/react";
import Terminal from "../Terminal/Terminal";

export interface ICodeTab {
  tabId: string;
  title: string;
  onDisplay?: boolean;
}

export interface ICodeSession {}

const CodeTab: React.FC<ICodeTab> = ({ tabId, title, onDisplay = true }) => {
  const codeRef = useRef<editor.IStandaloneCodeEditor>(null);
  const workerRef = useRef<Worker>(null);
  const [logs, setLogs] = React.useState<string[]>([]);

  useEffect(() => {
    workerRef.current = new Worker(new URL("/src/utils/worker.ts", import.meta.url));

    workerRef.current.onmessage = (event) => {
      console.log(event);
      if (event.data) {
        setLogs([event.data]);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const onCodeMount: OnMount = (editor, monaco) => {
    codeRef.current = editor;
  };

  const onRunCode = () => {
    setLogs([]);
    if (codeRef.current) {
      const code = codeRef.current.getValue();
      workerRef.current?.postMessage({ code });
      /*       const args = { a: 2, b: 2 };
      const code = editor.current.getValue();

      const fn = Function.apply(Function, Object.keys(args).concat(code));
      const result = fn.apply(fn, Object.values(args));
      console.log(result); */
    }
  };

  const onStopCode = () => {};

  const onSaveCode = () => {};

  const onSaveAsCode = () => {};

  const onUploadCode = () => {};

  return (
    <div className={`flex-1 w-full h-full ${onDisplay ? "flex" : "hidden"}`}>
      <Sidebar
        editor={codeRef}
        onRunCode={onRunCode}
        onStopCode={onStopCode}
        onSaveCode={onSaveCode}
        onSaveAsCode={onSaveAsCode}
        onUploadCode={onUploadCode}
      />
      <div className="flex-1 w-full h-full flex flex-col">
        <Editor height="66vh" language="javascript" theme="vs-dark" onMount={onCodeMount} />
        <Terminal logs={logs} />
      </div>
    </div>
  );
};

export default CodeTab;
