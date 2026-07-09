export type AttributeType =
  | "STRING"
  | "TEXT"
  | "IMAGE"
  | "NUMERIC"
  | "DATE"
  | "PERIOD"
  | "BOOLEAN"
  | "DROPDOWN";

export interface Attribute {
  id: string;
  name: string;
  type: AttributeType;
  category: string;
  options: string[];
}

export interface CreateAttributeInput {
  name: string;
  type: AttributeType;
  category: string;
  options: string[];
}

export interface OptionTagsProps {
  options: string[];
  onChange: (options: string[]) => void;
}

export interface AttributeTableProps {
  attributes: Attribute[];
}

export interface VacancyFormProps {
  availableAttributes: Attribute[];
}

export interface RequirementRowProps {
  attributeId: string;
  value: any;
  allAttributes: Attribute[];
  onChange: (key: "attributeId" | "value", val: any) => void;
  onRemove: () => void;
}

export interface SelectedRequirement {
  attributeId: string;
  value: any;
}

export interface RequirementsSectionProps {
  requirements: SelectedRequirement[];
  availableAttributes: Attribute[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, key: "attributeId" | "value", val: any) => void;
}
