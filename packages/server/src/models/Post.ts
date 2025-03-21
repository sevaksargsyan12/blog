import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import { StatusType } from '../../../../shared/types';
import { IPost } from '../../../../shared/models';

// interface PostAttributes {
//   id: number;          // Auto-incremented, not required on creation
//   title: string;
//   content: string;
//   status: string;      // Assume this is not an enum in DB but controlled by API logic
//   createdAt?: Date;    // Managed by Sequelize, not required on creation
//   updatedAt?: Date;    // Managed by Sequelize, not required on creation
// }

// The class now explicitly uses PostAttributes for clarity
class Post extends Model<IPost, Omit<IPost, 'id' | 'createdAt' | 'updatedAt'>> {
  public id!: number;
  public title!: string;
  public status!: StatusType;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: true,
  },
);

export default Post;
