import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import { IPost, IPostCreate } from '../../../../shared/models';
import { StatusType } from '../../../../shared/types';

class Post extends Model<IPost | IPostCreate> {
  public id!: number;
  public title!: string;
  public status!: StatusType;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Post.init(
  {
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
  },
);

export default Post;
