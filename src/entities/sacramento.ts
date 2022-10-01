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
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Catequizando } from "./catequizando";

enum TipoSacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

@Entity({ name: "sacramento" })
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
}
