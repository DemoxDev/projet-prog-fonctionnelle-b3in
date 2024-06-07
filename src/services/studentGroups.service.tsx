import { StudentGroupModel } from '../models/studentGroupModel';
import { getCourseSessionById } from './courseSessions.service';

const studentGroupsData: StudentGroupModel[] = require('../data/studentGroups.json'); 

let studentGroups: StudentGroupModel[] = studentGroupsData;

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
  return newGroup;
}

export async function updateStudentGroup(id: number, updatedStudentGroup: StudentGroupModel): Promise<StudentGroupModel | undefined> {
  const index = studentGroups.findIndex(group => group.id === id);
  if (index !== -1) {
    studentGroups[index] = updatedStudentGroup;
    return updatedStudentGroup;
  } else {
    return undefined;
  }
}

export async function deleteStudentGroup(id: number): Promise<void> {
  studentGroups = studentGroups.filter(group => group.id !== id);
}

export async function assignGroupToCourseSession(sessionId: number, groupId: number): Promise<StudentGroupModel | undefined> {
  const session = await getCourseSessionById(sessionId);
  const group = await getStudentGroupById(groupId);
  if (session && group) {
    session.studentGroup = group;
    return group;
  } else {
    return undefined;
  }
}

export async function getStudentGroupByCourseSessionId(sessionId: number): Promise<StudentGroupModel | undefined> {
  const session = await getCourseSessionById(sessionId);
  return session?.studentGroup;
}

