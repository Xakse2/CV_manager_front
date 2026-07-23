export interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
  tags: string[];
}
