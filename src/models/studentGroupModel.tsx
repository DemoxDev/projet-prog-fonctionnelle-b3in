import { StudentModel } from "./studentModel";

export interface StudentGroupModel {
  id: number;
  name: string;
  students: StudentModel[];
  isMixed?: boolean;
}
