export class Courses {
  id: number;
  title: string;
  category: string;
  description: string;
  link: string;
  teachers: string;

  constructor(
    id: number,
    title: string,
    category: string,
    description: string,
    link: string,
    teachers: string
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.link = link;
    this.teachers = teachers;
  }
}
