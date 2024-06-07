import { ProfessorModel } from '../models/professorModel';
import { StudentModel } from '../models/studentModel';

const professorsData: ProfessorModel[] = require('../data/professors.json'); 

let professors: ProfessorModel[] = professorsData;

export async function getProfessors(): Promise<ProfessorModel[]> {
  return professors;
}

export async function getProfessorById(identifier: number | string): Promise<ProfessorModel | undefined> {
  let parsedIdentifier: number | string = identifier;
  const professor = professors.find(prof => {
    if (typeof identifier === 'number') {
      return prof.id === identifier;
    } else { // Assume identifier is a string (firstName or lastName)
      const parsedNumber = parseInt(identifier, 10);
      parsedIdentifier = identifier;
      if (!isNaN(parsedNumber)) {
        parsedIdentifier = parsedNumber;
        console.log('Parsed identifier as number:', parsedIdentifier)
      }
      return professors.find(prof => {
        return prof.id === parsedIdentifier ||
               prof.firstName.toLowerCase() === identifier.toLowerCase() ||
               prof.lastName.toLowerCase() === identifier.toLowerCase();
      });
    }
  });
  return professor;
}

export async function createProfessor(professor: ProfessorModel): Promise<ProfessorModel> {
  const newId = Math.max(...professors.map(professor => professor.id)) + 1; // Generate new ID
  const newProfessor = { ...professor, id: newId };
  professors = [...professors, newProfessor];
  return newProfessor;
}

export async function updateProfessor(id: number, updatedProfessor: ProfessorModel): Promise<ProfessorModel | undefined> {
  const index = professors.findIndex(professor => professor.id === id);
  if (index !== -1) {
    professors[index] = updatedProfessor;
    return updatedProfessor;
  } else {
    return undefined;
  }
}

export async function deleteProfessor(id: number): Promise<void> {
  professors = professors.filter(professor => professor.id !== id);
}

export function getTop3RecurringStudentsPerProfessor(): { professor: ProfessorModel, students: StudentModel[] }[] {
  const studentCourseCounts: Record<number, number> = professors.reduce((acc, professor) => {
    professor.courseSessions.forEach((session) => {
      session.studentGroup.students.forEach((student: StudentModel) => {
        acc[student.id] = (acc[student.id] || 0) + 1;
      });
    });
    return acc;
  }, {} as Record<number, number>);

  const top3RecurringStudentsPerProfessor: { professor: ProfessorModel, students: StudentModel[] }[] = professors.map(professor => {
    const top3Students = professor.courseSessions.map(session => {
      return session.studentGroup.students.sort((a, b) => studentCourseCounts[b.id] - studentCourseCounts[a.id]).slice(0, 3);
    });
    return { professor, students: top3Students.flat() };
  });

  return top3RecurringStudentsPerProfessor;
}

// Give me all the function names here
// getProfessors, getProfessorById, createProfessor, updateProfessor, deleteProfessor, getTop3RecurringStudentsPerProfessor