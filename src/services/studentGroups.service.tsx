import { StudentGroupModel } from '../models/studentGroupModel';
import { getCourseSessionById } from './courseSessions.service';
import { StudentModel } from '../models/studentModel';
import { getStudentById, getStudents, getStudentsByGender } from './students.service';

const studentGroupsData: StudentGroupModel[] = require('../data/studentGroups.json'); 

let studentGroups: StudentGroupModel[] = studentGroupsData;

export function getStudentGroups(): StudentGroupModel[] {
  return studentGroups;
}

export function getStudentGroupById(id: number): StudentGroupModel | undefined {
  return studentGroups.find(group => group.id === id);
}

export function createStudentGroup(studentGroup: StudentGroupModel): StudentGroupModel {
  const newId = Math.max(...studentGroups.map(group => group.id)) + 1;
  const newGroup = { ...studentGroup, id: newId };
  studentGroups = [...studentGroups, newGroup]; 
  return newGroup;
}

export function updateStudentGroup(id: number, updatedStudentGroup: StudentGroupModel): StudentGroupModel | undefined {
  const index = studentGroups.findIndex(group => group.id === id);
  if (index !== -1) {
    studentGroups[index] = updatedStudentGroup;
    return updatedStudentGroup;
  } else {
    return undefined;
  }
}

export function deleteStudentGroup(id: number): void {
  studentGroups = studentGroups.filter(group => group.id !== id);
}

export function assignGroupToCourseSession(sessionId: number, groupId: number): StudentGroupModel | undefined {
  const session = getCourseSessionById(sessionId);
  const group = getStudentGroupById(groupId);
  if (session && group) {
    session.studentGroup = group.id;
    return group;
  } else {
    return undefined;
  }
}

export function getStudentsInMultipleGroups(): StudentModel[] {
  const studentGroups: StudentGroupModel[] = getStudentGroups();
  const studentsInMultipleGroups: StudentModel[] = [];

  for (const group of studentGroups) {
    if (group.students) {
      for (const studentId of group.students) {
        const student = getStudentById(studentId);
        if (student) {
          if (!studentsInMultipleGroups.includes(student)) {
            studentsInMultipleGroups.push(student);
          }
        }
      }
    }
  }

  return studentsInMultipleGroups;
}

export function createTPGroups(): StudentGroupModel[] {
  const students = getStudents();
  const femaleStudents = students.filter(student => student.gender === 'F');
  const maleStudents = students.filter(student => student.gender === 'M');
  const groups: StudentGroupModel[] = [];
  let groupNumber = 1;
  let group: StudentGroupModel = { id: 0, name: `Groupe TP ${groupNumber}`, students: [], isMixed: true };
  let groupSize = 0;

  while (femaleStudents.length > 0 || maleStudents.length > 0) {
    const student = femaleStudents.length > 0 ? femaleStudents.shift() : maleStudents.shift();

    if (groupSize === 4) {
      groups.push(group);
      groupNumber++;
      group = { id: 0, name: `Groupe TP ${groupNumber}`, students: [], isMixed: true };
      groupSize = 0;
    }

    if (student) {
      group.students?.push(student.id);
      groupSize++;
    }

    if (femaleStudents.length === 0 && group.isMixed) {
      group.isMixed = undefined;
    }
  }

  if (groupSize > 0) {
    groups.push(group);
  }

  return groups;
}
