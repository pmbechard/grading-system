export default interface SubjectInterface {
  subject: string;
  categories: {
    category: string;
    assignments: { name: string; quarter: string[] }[];
    weight: string;
  }[];
}
