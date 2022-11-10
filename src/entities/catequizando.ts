import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
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

enum Sexo {
  MASCULINO = "M",
  FEMININO = "F",
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

  @Column({
    type: "varchar",
    length: 120,
    charset: "utf8mb4",
    collation: "utf8mb4_0900_as_cs",
  })
  @IsString({ message: "Este campo recebe uma string" })
  @MaxLength(120, { message: "Tamanho máximo de 120 caracteres" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  nome!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: true })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  todos_sac!: string;

  @Column({ type: "enum", enum: EstadoCivil, default: null, nullable: true })
  @IsEnum(EstadoCivil, { message: "Enum não correspondente" })
  @IsOptional()
  estado_civil!: string;

  @Column("varchar", { length: 16, nullable: true })
  @IsString({ message: "Este campo recebe uma string" })
  @MaxLength(16, { message: "Tamanho máximo de 16 caracteres" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  telefone_1!: string;

  @Column("varchar", { length: 16, nullable: true })
  @IsString({ message: "Este campo recebe uma string" })
  @MaxLength(16, { message: "Tamanho máximo de 16 caracteres" })
  @IsOptional()
  telefone_2!: string;

  @Column({ type: "enum", enum: Sexo, default: null, nullable: false })
  @IsEnum(Sexo, { message: "Enum não correspondente" })
  @IsOptional()
  sexo!: string;

  @Column({ type: "datetime", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsOptional()
  data_nascimento!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
