import { StudentModel } from '../models/studentModel';
import * as fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(__dirname, '../data/students.json');

// Charger données JSON
async function loadStudentsFromFile(): Promise<StudentModel[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading students from file:", error);
    return []; // Return empty array if loading fails
  }
}

// Save students to JSON
async function saveStudentsToFile(students: StudentModel[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(students, null, 2));
  } catch (error) {
    console.error("Error saving students to file:", error);
    throw error; // Re-throw error to be handled by component
  }
}

// Load students on initial render
let students: StudentModel[] = []; 
loadStudentsFromFile().then(data => {
  students = data;
});

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
  await saveStudentsToFile(students); // Enregistrer après création
  return newStudent;
}

export async function updateStudent(id: number, updatedStudent: StudentModel): Promise<StudentModel | undefined> {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students[index] = updatedStudent;
    await saveStudentsToFile(students); // Enregistrer après maj
    return updatedStudent;
  } else {
    return undefined; // Student non trouvé
  }
}

export async function deleteStudent(id: number): Promise<void> {
  students = students.filter(student => student.id !== id);
  await saveStudentsToFile(students); // Enregistrer après suppression
}

