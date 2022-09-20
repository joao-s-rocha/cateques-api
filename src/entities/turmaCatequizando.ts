import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Catequizando } from "./catequizando";
import { Turma } from "./turma";

enum Status {
  ATIVO = "A",
  DESISTENTE = "D",
}

@Entity({ name: "turma_catequizando" })
@Unique("UQ_CATEQUIZANDO_TURMA", ["catequizando", "turma"])
export class TurmaCatequizando {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Catequizando)
  @JoinColumn({ referencedColumnName: "id" })
  catequizando!: Catequizando;

  @ManyToOne((type) => Turma)
  @JoinColumn({ referencedColumnName: "id" })
  turma!: Turma;

  @Column({ type: "enum", enum: Status, nullable: false })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(Status, { message: "Enum não correspondente" })
  @IsNotEmpty()
  status!: string;

  @Column({ type: "date", nullable: false })
  @IsDate()
  @IsNotEmpty()
  data_desistencia!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
