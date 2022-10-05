import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Catequizando } from "./catequizando";
import { Turma } from "./turma";

enum Status {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

@Entity({ name: "turma_catequizando" })
@Unique("UQ_CATEQUIZANDO_TURMA", ["catequizando", "turma"])
export class TurmaCatequizando {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Catequizando, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id" })
  catequizando!: Catequizando;

  @ManyToOne((type) => Turma, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ referencedColumnName: "id" })
  turma!: Turma;

  @Column({ type: "enum", enum: Status, nullable: true, default: Status.ATIVO })
  @IsEnum(Status, { message: "Enum não correspondente" })
  @IsNotEmpty()
  status!: string;

  @Column({ type: "datetime", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsOptional()
  data_desistencia!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
