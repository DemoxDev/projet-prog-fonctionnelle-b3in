import CourseSessionModel from './courseSessionModel';

export interface ProfessorModel {
    id: number;
    firstName: string;
    lastName: string;
    courseSessions: CourseSessionModel[];
}
  