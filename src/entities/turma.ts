import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
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
// import { Catequizando } from "./catequizando";
//   import { Catequizando } from "./catequizando";

enum TipoSacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

@Entity({ name: "turma" })
@Unique("UQ_DESCRICAO", ["descricao"])
export class Turma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 12 })
  @IsString({ message: "Este campo recebe uma string" })
  @MaxLength(12, { message: "Tamanho máximo para esse campo é de 12 caracter" })
  @MinLength(5, { message: "Tamanho máximo para esse campo é de 5 caracter" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  descricao!: string;

  @Column({ type: "enum", enum: TipoSacramento, nullable: false })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(TipoSacramento, { message: "Enum não correspondente" })
  @IsNotEmpty()
  tipo_sacramento!: string;

  @Column({ type: "date", nullable: false })
  @IsDate()
  @IsNotEmpty()
  data_inicio!: Date;

  @Column({ type: "date", nullable: true })
  @IsDate()
  @IsOptional()
  data_fechamento!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
