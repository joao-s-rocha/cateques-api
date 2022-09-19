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
  COORDENADOR = "COORD",
  CATEQUISTA = "CAT",
}

@Entity({ name: "usuario" })
@Unique("UQ_USUARIO", ["login", "senha"])
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30, nullable: false })
  @MaxLength(30, { message: "Tamanho máximo para esse campo é de 30 caracter" })
  @MinLength(4, { message: "Tamanho máximo para esse campo é de 4 caracter" })
  @IsString({ message: "Este campo deve receber uma String" })
  @IsNotEmpty({ message: "Este campo deve receber um valor" })
  login!: string;

  @Column({ type: "varchar", length: 120, nullable: false })
  @MaxLength(120, {
    message: "Tamanho máximo para esse campo é de 120 caracter",
  })
  @MinLength(3, { message: "Tamanho máximo para esse campo é de 3 caracter" })
  @IsString({ message: "Este campo deve receber uma String" })
  @IsNotEmpty({ message: "Este campo deve receber um valor" })
  senha!: string;

  @Column({ type: "enum", enum: TipoUsuario, nullable: false })
  @MaxLength(5, { message: "Tamanho máximo para esse campo é de 5 caracter" })
  @MinLength(3, { message: "Tamanho máximo para esse campo é de 3 caracter" })
  @IsEnum(TipoUsuario, { message: "Enum não correspondente" })
  @IsNotEmpty()
  tipo!: string;

  @Column("varchar", { length: 120 })
  @IsString({ message: "Este campo recebe uma string" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  nome!: string;

  @CreateDateColumn()
  data_cad!: Date;
}