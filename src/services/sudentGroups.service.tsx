import { StudentGroup } from '../models/studentGroupModel';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function getStudentGroups(): Promise<StudentGroup[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/student-groups`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching student groups:", error);
    throw error;
  }
}

export async function getStudentGroupById(id: number): Promise<StudentGroup> {
  try {
    const response = await fetch(`${API_BASE_URL}/student-groups/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching student group by ID:", error);
    throw error;
  }
}

export async function createStudentGroup(studentGroup: StudentGroup): Promise<StudentGroup> {
  try {
    const response = await fetch(`${API_BASE_URL}/student-groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentGroup),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating student group:", error);
    throw error;
  }
}

export async function updateStudentGroup(id: number, updatedStudentGroup: StudentGroup): Promise<StudentGroup> {
  try {
    const response = await fetch(`${API_BASE_URL}/student-groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudentGroup),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating student group:", error);
    throw error;
  }
}

export async function deleteStudentGroup(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/student-groups/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting student group:", error);
    throw error;
  }
}
