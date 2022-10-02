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
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Usuario } from "./usuario";
import { Turma } from "./turma";

@Entity({ name: "turma_catequista" })
@Unique("UQ_CATEQUISTA_TURMA", ["usuario", "turma"])
export class TurmaCatequista {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Usuario, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ referencedColumnName: "id" })
  usuario!: Usuario;

  @ManyToOne((type) => Turma, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ referencedColumnName: "id" })
  turma!: Turma;

  @CreateDateColumn()
  data_cad!: Date;
}
