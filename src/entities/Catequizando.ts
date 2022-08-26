import {
  IsDate,
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

  @Column({ type: "char", enum: SimNao, default: SimNao.NAO })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao)
  todos_sac!: string;

  @Column({ type: "char", enum: SimNao, default: SimNao.NAO })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao)
  padrinho!: string;

  @Column({ type: "char", enum: SimNao, default: SimNao.NAO })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao)
  madrinha!: string;

  @Column({ type: "char", enum: EstadoCivil, default: null })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(EstadoCivil)
  estado_civil!: string;

  @Column("date")
  @IsDate()
  data_nascimento!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
