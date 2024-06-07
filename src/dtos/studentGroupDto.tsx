import StudentDto from "./studentDto";

export interface StudentGroupDto {
    id: number;
    name: string;
    students: StudentDto[];
    isMixed?: boolean;
  }