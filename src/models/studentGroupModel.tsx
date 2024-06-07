import { Student } from "./studentModel";

export interface StudentGroup {
  id: number;
  name: string;
  students: Student[];
  isMixed?: boolean;
}
