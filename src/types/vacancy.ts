import type { Attribute } from "./attribute";

export interface CreateVacancyDto {
  title: string;
  company: string;
  description: string;
  salaryFrom: number | null;
  salaryTo: number | null;

  attributes: {
    attributeId: string;
    required: boolean;
  }[];

  requirements: {
    attributeId: string;
    operator: string;
    value: string;
  }[];

  version: number;
}

export interface VacancyResponse {
  id: string;
  title: string;
  company: string;
  description: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  version: number;

  PositionAttribute: {
    attributeId: string;
    required: boolean;
    Attribute: Attribute;
  }[];

  PositionAccessRule: {
    attributeId: string;
    operator: string;
    value: string;
    Attribute: Attribute;
  }[];
}

export interface VacancyFormProps {
  availableAttributes: Attribute[];
  mode: "create" | "edit";
  initialData?: VacancyResponse;
}
