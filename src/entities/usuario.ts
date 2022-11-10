import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

enum TipoUsuario {
  COORDENADOR = "COORDENADOR",
  CATEQUISTA = "CATEQUISTA",
}

@Entity({ name: "usuario" })
@Unique("UQ_USUARIO", ["login"])
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 30,
    charset: "utf8mb4",
    collation: "utf8mb4_0900_as_cs",
    nullable: false,
  })
  @MaxLength(30, {
    message: "Tamanho máximo para esse campo é de 30 caracteres",
  })
  @MinLength(4, { message: "Tamanho mínimo para esse campo é de 4 caracteres" })
  @IsString({ message: "Este campo deve receber uma String" })
  @IsNotEmpty({ message: "Este campo deve receber um valor" })
  login!: string;

  @Column({
    type: "varchar",
    length: 120,
    charset: "utf8mb4",
    collation: "utf8mb4_0900_as_cs",
    nullable: false,
  })
  @MaxLength(120, {
    message: "Tamanho máximo para esse campo é de 120 caracteres",
  })
  @MinLength(3, { message: "Tamanho mínimo para esse campo é de 3 caracteres" })
  @IsString({ message: "Este campo deve receber uma String" })
  @IsNotEmpty({ message: "Este campo deve receber um valor" })
  senha!: string;

  @Column({ type: "enum", enum: TipoUsuario, nullable: false })
  @MaxLength(11, {
    message: "Tamanho máximo para esse campo é de 11 caracteres",
  })
  @MinLength(10, {
    message: "Tamanho mínimo para esse campo é de 10 caracteres",
  })
  @IsEnum(TipoUsuario, { message: "Enum não correspondente" })
  @IsNotEmpty()
  tipo!: string;

  @Column({
    type: "varchar",
    length: 120,
    charset: "utf8mb4",
    collation: "utf8mb4_0900_as_cs",
  })
  @IsString({ message: "Este campo recebe uma string" })
  @MaxLength(120, {
    message: "Tamanho máximo para esse campo é de 120 caracteres",
  })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  nome!: string;

  @CreateDateColumn()
  data_cad!: Date;
}
