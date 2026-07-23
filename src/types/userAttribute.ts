import type { Attribute } from "./attribute";

export interface UserAttribute {
  id: string;
  userId: string;
  attributeId: string;
  value: string;

  Attribute?: Attribute;
}

export interface CreateUserAttributeRequest {
  attributeId: string;
  value: string;
}

export interface UpdateUserAttributeRequest {
  attributeId: string;
  value: string;
}
