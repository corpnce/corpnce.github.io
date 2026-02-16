export interface BlogPost {
  title: string;
  description: string;
  author: string;
  publishedDate: Date;
  tags: string[];
  readingTime: number;
  slug: string;
}

export interface Course {
  name: string;
  description: string;
  slug: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  course?: string;
  message?: string;
}
