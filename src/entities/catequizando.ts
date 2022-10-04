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

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: true })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  todos_sac!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: true })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  padrinho!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: true })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  madrinha!: string;

  @Column({ type: "enum", enum: EstadoCivil, default: null, nullable: true })
  @IsEnum(EstadoCivil, { message: "Enum não correspondente" })
  @IsOptional()
  estado_civil!: string;

  @Column({ type: "date", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsOptional()
  data_nascimento!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
