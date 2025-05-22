import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "./user";
import Follow from "./follow";

@Table({
  underscored: true,
})
export default class Vacation extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING(64))
  destination: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  vacationStart: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  vacationEnd: Date;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  price: number;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  imageUrl: string;

  @BelongsToMany(() => User, () => Follow, "vacationId", "userId")
  followers: User[];
}
