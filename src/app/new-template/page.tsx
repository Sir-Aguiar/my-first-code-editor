"use client";

import { Button } from "@mui/material";
import styles from "./page.module.css";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useState } from "react";
import { ICreateTestCaseDTO, ICreateTestInputDTO } from "@/dtos/template";

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => setActiveStep((prev) => prev + 1);
  const previousStep = () => setActiveStep((prev) => prev - 1);

  const [statement, setStatement] = useState("");
  const onStatementChange = (value: string) => setStatement(value);

  const [testCases, setTestCases] = useState<ICreateTestCaseDTO[]>([]);
  const addTestCase = () => {};

  const [testInputs, setTestInputs] = useState<ICreateTestInputDTO[]>([]);
  const addTestInput = (testCaseId: number) => {};

  return (
    <div className={`${styles.main_container}`}>
      {activeStep === 0 && (
        <>
          <h1 className="text-xl font-semibold text-start w-full">Defina um enunciado</h1>
          <p>
            Adicione um enunciado para o seu template, você pode utilizar markdown para formatar o texto, adicionar
            imagens, etc... Clique em vizualizar para ver como o seu enunciado ficará.
          </p>
          <MarkdownEditor className="flex flex-1 w-full" value={statement} onChange={onStatementChange} />
        </>
      )}

      {activeStep === 1 && (
        <>
          <h1 className="text-xl font-semibold text-start w-full">Adicione entradas de teste</h1>
          <p>
            Adicione entradas de teste para o seu template, você pode adicionar quantas entradas desejar, cada entrada
            deve conter um input e um output esperado.
          </p>
          <p>Observação: Específique o tipo das suas entradas conforme as opções disponíveis</p>
        </>
      )}

      <div className="w-full flex items-center justify-between">
        {activeStep > 0 && <Button onClick={previousStep}>Voltar</Button>}
        <Button sx={{ marginLeft: "auto" }} onClick={nextStep}>
          Próximo
        </Button>
      </div>
    </div>
  );
}
