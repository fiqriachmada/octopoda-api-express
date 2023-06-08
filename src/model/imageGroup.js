import { DataTypes, Model } from 'sequelize';
import sequelize from '../apis/database.js';
import { Image } from './image.js';

class ImageGroup extends Model {}

ImageGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'image_group',
    timestamps: false, // Tambahkan ini
    modelName: 'image_group',
  }
);

ImageGroup.hasMany(Image, { foreignKey: 'image_group_id' });

export { ImageGroup };
