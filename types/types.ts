// src/types/types.ts
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}
