import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Follow from "./follow";
import Vacation from "./vacation";

@Table({
  underscored: true,
})
export default class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING(40))
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(40))
  lastName: string;

  @Index({ unique: true })
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(64))
  password: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isAdmin: boolean;

  @BelongsToMany(() => Vacation, () => Follow, "userId", "vacationId")
  followedVacations: Vacation[];
}
