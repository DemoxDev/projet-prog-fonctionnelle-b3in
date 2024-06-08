import courseSessionModel from '../models/courseSessionModel';
import { ProfessorModel } from '../models/professorModel';
import { StudentModel } from '../models/studentModel';
import { getCourseSessionById, getCourseSessions } from './courseSessions.service';
import { getStudentGroupById } from './studentGroups.service';
import { getStudentById } from './students.service';

const professorsData: ProfessorModel[] = require('../data/professors.json'); 

let professors: ProfessorModel[] = professorsData;

export function getProfessors(): ProfessorModel[] {
  return professors;
}

export function getProfessorById(id: number): ProfessorModel | undefined {
  return professors.find(professor => professor.id === id);
}

export function getProfessorByString(searchString: string): ProfessorModel[] {
  return professors.filter(professor => professor.firstName.includes(searchString) || professor.lastName.includes(searchString));
}

// Modify createProfessor for professor to be a json object we send to it that then gets transformed to a ProfessorModel object

export function createProfessor(professor: any): ProfessorModel {
  const newId = Math.max(...professors.map(professor => professor.id)) + 1;
  const newProfessor = { ...professor, id: newId };
  professors = [...professors, newProfessor];
  return newProfessor;
}

export function updateProfessor(id: number, updatedProfessor: ProfessorModel): ProfessorModel | undefined {
  const index = professors.findIndex(professor => professor.id === id);
  if (index !== -1) {
    professors[index] = updatedProfessor;
    return updatedProfessor;
  } else {
    return undefined;
  }
}

export function deleteProfessor(id: number): void {
  professors = professors.filter(professor => professor.id !== id);
}

export function getTop3RecurringStudentsPerProfessor() {
  const result: { [key: string]: StudentModel[] } = {};

  for (const professor of professors) {
    const studentCounts: { [key: string]: number } = {};

    for (const sessionId of professor.courseSessions) {
      const session = getCourseSessionById(sessionId);
    
      if (session) {
        const groupId = session.studentGroup;
        const group = getStudentGroupById(groupId);
        if (group) {
          for (const studentId of group.students) {
            if (!studentCounts[studentId]) {
              studentCounts[studentId] = 0;
            }
            studentCounts[studentId]++;
          }
        }
      }
    }

    const sortedStudentIds = Object.entries(studentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([studentId]) => studentId);

    const sortedStudents = sortedStudentIds
      .map(studentId => getStudentById(parseInt(studentId)))
      .filter(student => student !== undefined) as StudentModel[];

    result[professor.id] = sortedStudents;
  }

  return result;
}

export function getProfessorsInMultipleSessions(): ProfessorModel[] {
  const sessions = getCourseSessions();
  const professorsInMultipleSessions: ProfessorModel[] = [];

  for (const session of sessions) {
    const professorId = session.professor;
    const professor = getProfessorById(professorId);
    if (professor) {
      if (!professorsInMultipleSessions.includes(professor)) {
        professorsInMultipleSessions.push(professor);
      }
    }
  }

  return professorsInMultipleSessions;
}

export function professorTeachesInCity(professorId: number, city: string): boolean {
  const professor = getProfessorById(professorId);
  if (professor) {
    const sessions = getCourseSessions();
    for (const session of sessions) {
      if (session.professor === professorId && session.city === city) {
        return true;
      }
    }
  }
  return false;
}
