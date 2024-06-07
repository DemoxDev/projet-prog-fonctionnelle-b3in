import { ProfessorModel } from "./professorModel";
import { StudentGroupModel } from "./studentGroupModel";

export default interface courseSessionModel {
  id: number;
  name: string;
  professor: ProfessorModel;
  studentGroup: StudentGroupModel;
  city: string;
  date: Date;
}
