import { ProfessorModel } from "./professorModel";
import { StudentGroupModel } from "./studentGroupModel";

export default interface courseSessionModel {
  id: number;
  name: string;
  professor: number;
  studentGroup: number;
  city: string;
  date: Date;
}
