import courseSessionModel from '../models/courseSessionModel';
import { StudentModel } from '../models/studentModel';
import { getCourseSessionsByCity } from './courseSessions.service';

const studentsData: StudentModel[] = require('../data/students.json'); // Replace with your actual JSON file path

let students: StudentModel[] = studentsData; // Initialize with loaded data


export async function getStudents(): Promise<StudentModel[]> {
  return students;
}

export async function getStudentById(id: number): Promise<StudentModel | undefined> {
  return students.find(student => student.id === id);
}

export async function createStudent(student: StudentModel): Promise<StudentModel> {
  const newId = Math.max(...students.map(student => student.id)) + 1;
  const newStudent = { ...student, id: newId };
  students = [...students, newStudent];
  return newStudent;
}

export async function updateStudent(id: number, updatedStudent: StudentModel): Promise<StudentModel | undefined> {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students[index] = updatedStudent;
    return updatedStudent;
  } else {
    return undefined; // Student non trouvé
  }
}

export async function deleteStudent(id: number): Promise<void> {
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

export async function getStudentsByCity(city: string): Promise<StudentModel[]>
{
  const sessionsByCity: courseSessionModel[] = await getCourseSessionsByCity(city);
  const studentsByCity: StudentModel[] = [];
  sessionsByCity.forEach(session => {
    session.studentGroup.students.forEach(student => {
      if (!studentsByCity.includes(student)) {
        studentsByCity.push(student);
      }
    });
  });
  return studentsByCity;
}

export async function getStudentsByString(searchString: string): Promise<StudentModel[]>
{
  return students.filter(student => student.firstName.includes(searchString) || student.lastName.includes(searchString));
}