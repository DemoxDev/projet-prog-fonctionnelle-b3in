import CourseSession from '../models/courseSessionModel';
import * as fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(__dirname, '../data/courseSessions.json');

async function loadCourseSessionsFromFile(): Promise<CourseSession[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading course sessions from file:", error);
    return [];
  }
}

async function saveCourseSessionsToFile(courseSessions: CourseSession[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(courseSessions, null, 2));
  } catch (error) {
    console.error("Error saving course sessions to file:", error);
    throw error;
  }
}

let courseSessions: CourseSession[] = [];
loadCourseSessionsFromFile().then(data => {
  courseSessions = data;
});

export async function getCourseSessions(): Promise<CourseSession[]> {
  return courseSessions;
}

export async function getCourseSessionById(id: number): Promise<CourseSession | undefined> {
  return courseSessions.find(session => session.id === id);
}

export async function createCourseSession(session: CourseSession): Promise<CourseSession> {
  const newId = Math.max(...courseSessions.map(session => session.id)) + 1;
  const newSession = { ...session, id: newId };
  courseSessions = [...courseSessions, newSession];
  await saveCourseSessionsToFile(courseSessions);
  return newSession;
}

export async function updateCourseSession(id: number, updatedSession: CourseSession): Promise<CourseSession | undefined> {
  const index = courseSessions.findIndex(session => session.id === id);
  if (index !== -1) {
    courseSessions[index] = updatedSession;
    await saveCourseSessionsToFile(courseSessions);
    return updatedSession;
  } else {
    return undefined;
  }
}

export async function deleteCourseSession(id: number): Promise<void> {
  courseSessions = courseSessions.filter(session => session.id !== id);
  await saveCourseSessionsToFile(courseSessions);
}
