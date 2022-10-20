export default interface Student {
  name: string;
  grades: {
    class: string;
    assignments: {
      name: string;
      category: string;
      grade: string;
      date: string;
    }[];
  }[];
}
