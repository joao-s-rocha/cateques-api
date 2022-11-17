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
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import catequizando from "../methods/catequizando";
import { Catequizando } from "./catequizando";

enum TipoSacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

@Entity({ name: "sacramento" })
@Unique("UQ_SACRAMENTO", ["catequizando", "tipo_sacramento"])
export class Sacramento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Catequizando, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id" })
  catequizando!: Catequizando;

  @Column({ type: "enum", enum: TipoSacramento, nullable: false })
  @IsEnum(TipoSacramento, { message: "Enum não correspondente" })
  @IsNotEmpty()
  tipo_sacramento!: string;

  @Column({
    type: "varchar",
    length: 120,
    charset: "utf8mb4",
    collation: "utf8mb4_0900_as_cs",
    nullable: true,
  })
  @MaxLength(120, {
    message: "Tamanho máximo para esse campo é de 120 caracteres",
  })
  @IsString({ message: "Este campo recebe uma string" })
  @IsOptional()
  nome_padrinho!: string;

  @Column({
    type: "varchar",
    length: 120,
    charset: "utf8mb4",
    collation: "utf8mb4_0900_as_cs",
    nullable: true,
  })
  @MaxLength(120, {
    message: "Tamanho máximo para esse campo é de 120 caracteres",
  })
  @IsString({ message: "Este campo recebe uma string" })
  @IsOptional()
  nome_madrinha!: string;

  @Column({ type: "datetime", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  data_inicio!: Date;

  @Column({ type: "datetime", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsOptional()
  data_fechamento!: Date;
}
