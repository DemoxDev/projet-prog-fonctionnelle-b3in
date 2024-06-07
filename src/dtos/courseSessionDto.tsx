import ProfessorDto from "./professorDto";
import { StudentGroupDto } from "./studentGroupDto";

export default interface CourseSession {
  id: number;
  name: string;
  professor: ProfessorDto;
  studentGroup: StudentGroupDto;
  city: string;
  date: Date;
}
