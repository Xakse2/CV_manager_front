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
