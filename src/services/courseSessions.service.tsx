import CourseSessionModel from '../models/courseSessionModel';
import { StudentModel } from '../models/studentModel';

const courseSessionsData: CourseSessionModel[] = require('../data/courseSessions.json'); 

let courseSessions: CourseSessionModel[] = courseSessionsData;

export async function getCourseSessions(): Promise<CourseSessionModel[]> {
  return courseSessions;
}

export async function getCourseSessionById(id: number): Promise<CourseSessionModel | undefined> {
  return courseSessions.find(session => session.id === id);
}

export async function createCourseSession(session: CourseSessionModel): Promise<CourseSessionModel> {
  const newId = Math.max(...courseSessions.map(session => session.id)) + 1; // Generate new ID
  const newSession = { ...session, id: newId };
  courseSessions = [...courseSessions, newSession];
  return newSession;
}

export async function updateCourseSession(id: number, updatedSession: CourseSessionModel): Promise<CourseSessionModel | undefined> {
  const index = courseSessions.findIndex(session => session.id === id);
  if (index !== -1) {
    courseSessions[index] = updatedSession;
    return updatedSession;
  } else {
    return undefined;
  }
}

export async function deleteCourseSession(id: number): Promise<void> {
  courseSessions = courseSessions.filter(session => session.id !== id);
}

export async function assignProfessorToCourseSession(sessionId: number, professorId: number): Promise<CourseSessionModel | undefined> {
  const session = await getCourseSessionById(sessionId);
  if (session) {
    session.professor.id = professorId;
    return session;
  } else {
    return undefined;
  }
}

export async function getCourseSessionsByCity(city: string): Promise<CourseSessionModel[]>
{
  return Promise.resolve(courseSessions.filter(session => session.city === city));
}

export function getCourseSessionsSortedByDate(): CourseSessionModel[] {
  return courseSessions.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getCourseSessionsByMonth(month: number, year: number): CourseSessionModel[] {
  return courseSessions.filter(session => session.date.getMonth() === month && session.date.getFullYear() === year);
}

export function countStudentsWithMoreThanXCourses(x: number): number {
  const studentCourseCounts: Record<number, number> = courseSessions.reduce((acc, session) => {
    session.studentGroup.students.forEach((student: StudentModel) => {
      acc[student.id] = (acc[student.id] || 0) + 1;
    });
    return acc;
  }, {} as Record<number, number>);

  return Object.values(studentCourseCounts).filter(count => count > x).length;
}

export async function assignGroupToCourseSession(sessionId: number, groupId: number): Promise<CourseSessionModel | undefined> {
  const session = await getCourseSessionById(sessionId);
  if (session) {
    session.studentGroup.id = groupId;
    return session;
  } else {
    return undefined;
  }
}

export function getCourseSessionWithMostStudents(): CourseSessionModel {
  return courseSessions.reduce((acc, session) => {
    return session.studentGroup.students.length > acc.studentGroup.students.length ? session : acc;
  });
}
