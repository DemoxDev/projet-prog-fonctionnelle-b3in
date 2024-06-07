import { Professor } from '../models/professorModel';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function getProfessors(): Promise<Professor[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/professors`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching professors:", error);
    throw error;
  }
}

export async function getProfessorById(id: number): Promise<Professor> {
  try {
    const response = await fetch(`${API_BASE_URL}/professors/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching professor by ID:", error);
    throw error;
  }
}

export async function createProfessor(professor: Professor): Promise<Professor> {
  try {
    const response = await fetch(`${API_BASE_URL}/professors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(professor),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating professor:", error);
    throw error;
  }
}

export async function updateProfessor(id: number, updatedProfessor: Professor): Promise<Professor> {
  try {
    const response = await fetch(`${API_BASE_URL}/professors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfessor),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating professor:", error);
    throw error;
  }
}

export async function deleteProfessor(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/professors/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting professor:", error);
    throw error;
  }
}
