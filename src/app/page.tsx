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

export default function Home() {
  const [codeTabs, setCodeTabs] = useState<ICodeTab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [codeSessions, setCodeSessions] = useState();

  const handleTabChange: MouseEventHandler = (event) => {
    const tabId = (event.target as HTMLElement).id;
    setActiveTab(tabId);
  };

  const addTab = () => {
    const tabId = Math.random().toString(36);
    setCodeTabs((tabs) => [...tabs, { tabId, title: `Sem Título` }]);
    setActiveTab(tabId);
  };

  return (
    <div className="flex-1 flex flex-col p-2">
      <header className={styles.header}>
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
    </div>
  );
}

