import { Professor } from "./professorModel";
import { StudentGroup } from "./studentGroupModel";

export default interface CourseSession {
  id: number;
  name: string;
  professor: Professor;
  studentGroup: StudentGroup;
  city: string;
  date: Date;
}
