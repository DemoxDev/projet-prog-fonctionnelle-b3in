import { StudentGroupModel } from '../models/studentGroupModel';
import * as fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(__dirname, '../data/studentGroups.json');

// Charger données JSON
async function loadStudentGroupsFromFile(): Promise<StudentGroupModel[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading student groups from file:", error);
    return [];
  }
}

// Enregistrer vers JSON
async function saveStudentGroupsToFile(studentGroups: StudentGroupModel[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(studentGroups, null, 2));
  } catch (error) {
    console.error("Error saving student groups to file:", error);
    throw error;
  }
}

// Charger données JSON au démarrage
let studentGroups: StudentGroupModel[] = []; // Initialiser en tant que tableau vide
loadStudentGroupsFromFile().then(data => {
  studentGroups = data;
});

export async function getStudentGroups(): Promise<StudentGroupModel[]> {
  return studentGroups;
}

export async function getStudentGroupById(id: number): Promise<StudentGroupModel | undefined> {
  return studentGroups.find(group => group.id === id);
}

export async function createStudentGroup(studentGroup: StudentGroupModel): Promise<StudentGroupModel> {
  const newId = Math.max(...studentGroups.map(group => group.id)) + 1;
  const newGroup = { ...studentGroup, id: newId };
  studentGroups = [...studentGroups, newGroup];
  await saveStudentGroupsToFile(studentGroups); // Enregistrer après création
  return newGroup;
}

export async function updateStudentGroup(id: number, updatedStudentGroup: StudentGroupModel): Promise<StudentGroupModel | undefined> {
  const index = studentGroups.findIndex(group => group.id === id);
  if (index !== -1) {
    studentGroups[index] = updatedStudentGroup;
    await saveStudentGroupsToFile(studentGroups); // Enregistrer après maj
    return updatedStudentGroup;
  } else {
    return undefined; // Groupe non trouvé
  }
}

export async function deleteStudentGroup(id: number): Promise<void> {
  studentGroups = studentGroups.filter(group => group.id !== id);
  await saveStudentGroupsToFile(studentGroups); // Enregistrer après suppression
}
