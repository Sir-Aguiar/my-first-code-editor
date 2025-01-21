"use client";

import { Editor, OnMount } from "@monaco-editor/react";
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { editor } from "monaco-editor";
import Sidebar from "@/components/Sidebar/Sidebar";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { Button, Tabs } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CodeTab, { ICodeTab } from "@/components/CodeTab/CodeTab";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useRouter } from "next/navigation";

export default function Home() {
  const [codeTabs, setCodeTabs] = useState<ICodeTab[]>([]);
  const [activeTab, setActiveTab] = useState<string>("start");
  const [codeSessions, setCodeSessions] = useState();

  const router = useRouter();

  const handleTabChange: MouseEventHandler = (event) => {
    const tabId = (event.target as HTMLElement).id;
    setActiveTab(tabId);
  };

  const addTab = () => {
    const tabId = Math.random().toString(36);
    setCodeTabs((tabs) => [...tabs, { tabId, title: `Sem Título` }]);
    setActiveTab(tabId);
  };

  const newTemplate = () => {
    router.push("/new-template");
  };

  return (
    <div className="flex-1 flex flex-col p-2">
      <header className={styles.header}>
        <div
          className={`${styles.tab} rounded-tl-md ${activeTab === "start" && styles.active_tab}`}
          id="start"
          onClick={handleTabChange}
        >
          Vulpes
        </div>
        {codeTabs.map(({ tabId, title }) => (
          <div
            className={`${styles.tab} ${activeTab === tabId && styles.active_tab}`}
            key={tabId}
            id={tabId}
            onClick={handleTabChange}
          >
            {title}
          </div>
        ))}
        <Button onClick={addTab}>
          <AddIcon />
        </Button>
      </header>
      {codeTabs.map((tab) => (
        <CodeTab key={tab.tabId} {...tab} onDisplay={tab.tabId === activeTab} />
      ))}
      {activeTab == "start" && (
        <div className="flex flex-col gap-4 justify-center items-center flex-1 bg-zinc-700">
          <div className="flex flex-wrap justify-center gap-4 max-w-[512px]">
            <button className={styles.action_button} onClick={newTemplate}>
              <LocalLibraryIcon fontSize="large" />
              <span>Novo Template</span>
            </button>
            <button className={styles.action_button} onClick={addTab}>
              <InsertDriveFileIcon fontSize="large" />
              <span>Novo Arquivo</span>
            </button>
            <button className={styles.action_button}>
              <UploadFileOutlinedIcon fontSize="large" />
              <span>Abrir Arquivo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

