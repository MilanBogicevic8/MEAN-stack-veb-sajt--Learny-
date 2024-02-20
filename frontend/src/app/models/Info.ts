export class Info {
    totalStudents = 0;
    totalActiveTeachers = 0;
    classesLastSevenDays = 0;
    classesLastThirtyDays = 0;
    subjects: string[] = [];
    engagedTeachersBySubject: { subject: string; teachers: string[] }[] = [];
  }