import { TestInputType, TestOutputType } from "@prisma/client";

export interface ICreateTemplateDTO {
  statement: string;
  creatorId: number;
}

export interface ICreateTestCaseDTO {
  templateId: number;
  expectedValue: string;
  expectedValueType: TestOutputType;
}

export interface ICreateTestInputDTO {
  testCaseId: number;
  value: string;
  valueType: TestInputType;
}
