import { ProfessorModel } from '../models/professorModel';
import * as fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(__dirname, '../data/professors.json'); // Path to the professors JSON file

async function loadProfessorsFromFile(): Promise<ProfessorModel[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading professors from file:", error);
    return [];
  }
}

async function saveProfessorsToFile(professors: ProfessorModel[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(professors, null, 2));
  } catch (error) {
    console.error("Error saving professors to file:", error);
    throw error;
  }
}

// Load professors on initial render
let professors: ProfessorModel[] = []; 
loadProfessorsFromFile().then(data => {
  professors = data;
});

export async function getProfessors(): Promise<ProfessorModel[]> {
  return professors;
}

export async function getProfessorById(id: number): Promise<ProfessorModel | undefined> {
  return professors.find(professor => professor.id === id);
}

export async function createProfessor(professor: ProfessorModel): Promise<ProfessorModel> {
  const newId = Math.max(...professors.map(professor => professor.id)) + 1;
  const newProfessor = { ...professor, id: newId };
  professors = [...professors, newProfessor];
  await saveProfessorsToFile(professors);
  return newProfessor;
}

export async function updateProfessor(id: number, updatedProfessor: ProfessorModel): Promise<ProfessorModel | undefined> {
  const index = professors.findIndex(professor => professor.id === id);
  if (index !== -1) {
    professors[index] = updatedProfessor;
    await saveProfessorsToFile(professors);
    return updatedProfessor;
  } else {
    return undefined;
  }
}

export async function deleteProfessor(id: number): Promise<void> {
  professors = professors.filter(professor => professor.id !== id);
  await saveProfessorsToFile(professors);
}

