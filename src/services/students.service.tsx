import courseSessionModel from '../models/courseSessionModel';
import { StudentModel } from '../models/studentModel';
import { getCourseSessionsByCity } from './courseSessions.service';
import { getStudentGroupById } from './studentGroups.service';

const studentsData: StudentModel[] = require('../data/students.json'); // Replace with your actual JSON file path

let students: StudentModel[] = studentsData; // Initialize with loaded data


export function getStudents(): StudentModel[] {
  return students;
}

export function getStudentById(id: number): StudentModel | undefined {
  return students.find(student => student.id === id);
}

export function createStudent(student: StudentModel): StudentModel {  
  const newId = Math.max(...students.map(student => student.id)) + 1;
  const newStudent = { ...student, id: newId };
  students = [...students, newStudent];
  return newStudent;
}

export function updateStudent(id: number, updatedStudent: StudentModel): StudentModel | undefined {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students[index] = updatedStudent;
    return updatedStudent;
  } else {
    return undefined; // Etudiant non trouvé
  }
}

export function deleteStudent(id: number): void {
  students = students.filter(student => student.id !== id);
}

export function getStudentsByGender(gender: 'M' | 'F'): StudentModel[] {
    return students.filter(student => student.gender === gender);
}

// Créer une fonction qui récupere tout les étudiants ayant des cours dans une certaine ville (ex:Paris), tu peux prendre en compte getCourseSessionsByCity
/*export async function getCourseSessionsByCity(city: string): Promise<CourseSessionModel[]>
{
  return Promise.resolve(courseSessions.filter(session => session.city === city));
}
  */

export function getStudentsByCity(city: string): StudentModel[] {
  const studentsInCity: StudentModel[] = [];
  const sessions = getCourseSessionsByCity(city);
  const studentGroups = sessions.map(session => getStudentGroupById(session.studentGroup));

  for (const group of studentGroups) {
    if(group) {
      if (group.students) {
        for (const studentId of group.students) {
          const student = getStudentById(studentId);
          if (student) {
            if (!studentsInCity.includes(student)) {
              studentsInCity.push(student);
            }
          }
        }
      }
    }
    
  }

  return studentsInCity;
}

export function getStudentsByString(searchString: string): StudentModel[]
{
  return students.filter(student => student.firstName.includes(searchString) || student.lastName.includes(searchString));
}
