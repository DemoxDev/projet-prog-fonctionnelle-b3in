import CourseSessionModel from '../models/courseSessionModel';
import { StudentModel } from '../models/studentModel';
import { getStudentGroupById } from './studentGroups.service';

const courseSessionJson = require('../data/courseSessions.json');

courseSessionJson.forEach((session: CourseSessionModel) => {
  session.date = new Date(session.date);
});

export const courseSessionsData: CourseSessionModel[] = courseSessionJson; 

let courseSessions: CourseSessionModel[] = courseSessionsData;

export function getCourseSessions(): CourseSessionModel[] {
  return courseSessions;
}

export function getCourseSessionById(id: number): CourseSessionModel | undefined {
  return courseSessions.find(session => session.id === id);
}

export function createCourseSession(session: CourseSessionModel): CourseSessionModel {
  const newId = Math.max(...courseSessions.map(session => session.id)) + 1; // Generate new ID
  const newSession = { ...session, id: newId };
  courseSessions = [...courseSessions, newSession];
  return newSession;
}

export function updateCourseSession(id: number, updatedSession: CourseSessionModel): CourseSessionModel | undefined {
  const index = courseSessions.findIndex(session => session.id === id);
  if (index !== -1) {
    courseSessions[index] = updatedSession;
    return updatedSession;
  } else {
    return undefined;
  }
}

export function deleteCourseSession(id: number): void {
  courseSessions = courseSessions.filter(session => session.id !== id);
}

export function assignProfessorToCourseSession(sessionId: number, professorId: number): CourseSessionModel | undefined {
  const session = getCourseSessionById(sessionId);
  if (session) {
    session.professor = professorId;
    return session;
  } else {
    return undefined;
  }
}

export function getCourseSessionsByCity(city: string): CourseSessionModel[]
{
  return courseSessions.filter(session => session.city === city);
}

export function getCourseSessionsSortedByDate(): CourseSessionModel[] {
  return courseSessions.sort((a, b) => {
    if (a.date instanceof Date && b.date instanceof Date) {
      return a.date.getTime() - b.date.getTime();
    } else {
      throw new Error('Invalid date in course session');
    }
  });
}

export function getCourseSessionsByDate(month: number, year: number): CourseSessionModel[] {
  return courseSessions.filter(session => session.date.getMonth() === month && session.date.getFullYear() === year);
}

export function countStudentsWithMoreThanXCourses(x: number): number {
  const studentCounts: { [key: string]: number } = {};

  for (const session of courseSessions) {
    const groupId = session.studentGroup;
    const group = getStudentGroupById(groupId);
    if (group) {
      for (const studentId of group.students) {
        if (!studentCounts[studentId]) {
          studentCounts[studentId] = 0;
        }
        studentCounts[studentId]++;
      }
    }
  }

  let count = 0;
  for (const studentId in studentCounts) {
    if (studentCounts[studentId] > x) {
      count++;
    }
  }

  return count;
}

/*
export function assignGroupToCourseSession(courseSessionId: number, studentGroupId: number) {
  const courseSession = getCourseSessionById(courseSessionId);
  const studentGroup = getStudentGroupById(studentGroupId);

  if (!courseSession || !studentGroup) {
    throw new Error('Course session or student group not found');
  }

  if (courseSession) {
    if (studentGroup) {
      courseSession.studentGroup = studentGroup.id;
    }
  }
  return courseSession;
}
*/

export function getCourseSessionWithMostStudents() {
  let maxStudents = 0;
  let sessionWithMostStudents = null;

  for (const session of courseSessions) {
    const groupId = session.studentGroup;
    const group = getStudentGroupById(groupId);
    if (group) {
      const numStudents = group.students.length;

      if (numStudents > maxStudents) {
        maxStudents = numStudents;
        sessionWithMostStudents = session;
      }
    }
  }

  return sessionWithMostStudents;
}
