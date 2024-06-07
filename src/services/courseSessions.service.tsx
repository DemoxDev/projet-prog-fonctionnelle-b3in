import CourseSession from "../models/courseSessionModel"

const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function getCourseSessions(): Promise<CourseSession[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching course sessions:", error);
    throw error; 
  }
}

export async function getCourseSessionById(id: number): Promise<CourseSession> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching course session by ID:", error);
    throw error;
  }
}

export async function createCourseSession(session: CourseSession): Promise<CourseSession> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating course session:", error);
    throw error;
  }
}

export async function updateCourseSession(id: number, updatedSession: CourseSession): Promise<CourseSession> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSession),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating course session:", error);
    throw error;
  }
}

export async function deleteCourseSession(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting course session:", error);
    throw error;
  }
}
