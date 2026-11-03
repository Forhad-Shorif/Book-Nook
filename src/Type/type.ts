export interface AddedBy {
  name: string;
  email: string;
}

export interface Book {
  _id?: string;
  title: string;
  author: string;
  category: "Fiction" | "Science" | "History" | "Kids" | "Islamic" | "Financial" | "Others" | string;
  coverImage: string;
  description: string;
  totalCopies: number;
  totalPages: number;
  rating: number;
  isPopular: boolean;
  addedBy: AddedBy;
  createdAt?: string;
}