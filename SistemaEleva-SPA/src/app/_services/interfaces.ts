export interface School {
  name: string;
  headmaster: string;
  address: string;
  city: string;
  phoneNumber: string;
  classes: Array<Class>;
}

export interface Class {
  name: string;
  year: number;
  schoolId: number;
  students: Array<Student>;
}

export interface Student {
  name: string;
  dateOfBirth: Date;
  mother: string;
  father: string;
  phoneNumber: string;
  classId: number;
}
