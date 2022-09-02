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
} from "typeorm";

enum SimNao {
  SIM = "S",
  NAO = "N",
}

enum EstadoCivil {
  CASADO = "C",
  SOLTEIRO = "S",
  VIUVO = "V",
  DIVORCIADO = "D",
}

@Entity({ name: "catequizando" })
export class Catequizando {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 120 })
  @IsString({ message: "Este campo recebe uma string" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  nome!: string;

  @Column({ type: "char", default: SimNao.NAO, nullable: true })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  todos_sac!: string;

  @Column({ type: "char", default: SimNao.NAO, nullable: true })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  padrinho!: string;

  @Column({ type: "char", default: SimNao.NAO, nullable: true })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  madrinha!: string;

  @Column({ type: "char", default: null, nullable: true })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(EstadoCivil, { message: "Enum não correspondente" })
  estado_civil!: string;

  @Column("date")
  @IsDate()
  data_nascimento!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
