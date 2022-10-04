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
  @IsEnum(TipoSacramento, { message: "Enum não correspondente" })
  @IsNotEmpty()
  tipo_sacramento!: string;

  @Column({ type: "date", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  data_inicio!: Date;

  @Column({ type: "date", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsOptional()
  data_fechamento!: Date;
}
