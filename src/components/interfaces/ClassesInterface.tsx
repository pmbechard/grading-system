export default interface ClassesInterface {
  classes: {
    class: {
      categories: {
        category: string;
        quarters: string[];
        assignments: { name: string; quarter: string }[];
      }[];
    }[];
  }[];
}
