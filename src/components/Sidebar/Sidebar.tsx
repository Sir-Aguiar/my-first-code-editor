"use client";

import React, { RefObject, useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import { editor } from "monaco-editor";

import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Divider } from "@mui/material";

export interface IProps {
  editor: RefObject<editor.IStandaloneCodeEditor | null>;
  onRunCode: () => void;
  onStopCode: () => void;
  onSaveCode: () => void;
  onSaveAsCode: () => void;
  onUploadCode: () => void;
}

const Sidebar: React.FC<IProps> = ({ editor, onRunCode, onSaveAsCode, onSaveCode, onStopCode, onUploadCode }) => {
  return (
    <aside className={`${styles.side_container}`}>
      <button className={`${styles.sidebar_button}`} onClick={onRunCode}>
        <PlayArrowOutlinedIcon fontSize="large" className="fill-[#2CA58D]" />
      </button>

      <button className={`${styles.sidebar_button}`} onClick={onStopCode}>
        <CropSquareOutlinedIcon fontSize="large" className="fill-[#A30015]" />
      </button>

      <Divider flexItem />

      <button className={`${styles.sidebar_button}`} onClick={onSaveCode}>
        <SaveOutlinedIcon fontSize="large" className="fill-[#0077B6]" />
      </button>

      <button className={`${styles.sidebar_button}`} onClick={onSaveAsCode}>
        <SaveAsOutlinedIcon fontSize="large" className="fill-[#0077B6]" />
      </button>

      <button className={`${styles.sidebar_button}`} onClick={onUploadCode}>
        <UploadFileOutlinedIcon fontSize="large" className="fill-[#E6C229]" />
      </button>
    </aside>
  );
};

export default Sidebar;
