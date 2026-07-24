import type { Attribute } from "./attribute";

export interface CVVirtualAttribute extends Attribute {
  value: string | null;
  required: boolean;
}

export interface CVProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  startDate: string;
  endDate: string | null;
}

export interface CVDetailResponse {
  id: string;
  isPublished: boolean;
  version: number;

  position: string;
  candidate: string;

  likes: number;
  likedByMe: boolean;

  attributes: CVVirtualAttribute[];
  projects: CVProjectData[];
}

export interface CreateCVRequest {
  positionId: string;
}

export interface CreateCVResponse {
  id: string;
  userId: string;
  positionId: string;
  version: number;
  isPublished: boolean;
}

export interface UpdateCVAttributeRequest {
  cvId: string;
  attributeId: string;
  value: string;
}

export interface CVListItem {
  id: string;
  isPublished: boolean;
  version: number;

  Position: {
    id: string;
    title: string;
  };
}
