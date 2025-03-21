import { StatusType } from "./types";

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: StatusType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostCreate extends Omit<IPost, 'id'> {}