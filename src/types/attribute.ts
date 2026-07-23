export type AttributeType =
  | "STRING"
  | "TEXT"
  | "IMAGE"
  | "NUMERIC"
  | "DATE"
  | "PERIOD"
  | "BOOLEAN"
  | "DROPDOWN";

export type AttributeCategory =
  "PERSONAL" | "EDUCATION" | "WORK_EXPERIENCE" | "SKILLS" | "LANGUAGES";

export interface Attribute {
  id: string;
  name: string;
  type: AttributeType;
  category: AttributeCategory | string;
  options?: string[];
  isSystem: boolean;
}

export interface CreateAttributeInput {
  name: string;
  type: AttributeType;
  category: AttributeCategory | string;
  options?: string[];
  isSystem: boolean;
}

export interface OptionTagsProps {
  options: string[];
  onChange: (options: string[]) => void;
}

export interface AttributeTableProps {
  attributes: Attribute[];
}

export interface SelectedRequirement {
  attributeId: string;
  operator: string;
  value: string;
}

export interface SelectedAttribute {
  attributeId: string;
  required: boolean;
}

export interface RequirementRowProps {
  attributeId: string;
  value: string | number | boolean | null;
  allAttributes: Attribute[];
  onChange: (
    key: "attributeId" | "value",
    val: string | number | boolean | null
  ) => void;
  onRemove: () => void;
}

export interface RequirementsSectionProps {
  requirements: SelectedRequirement[];
  availableAttributes: Attribute[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    key: "attributeId" | "operator" | "value",
    val: string | number | boolean | null
  ) => void;
}
