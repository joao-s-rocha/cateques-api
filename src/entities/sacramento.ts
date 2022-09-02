import {
  IsDate,
  IsEnum,
  IsInt,
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
} from "typeorm";
import { Catequizando } from "./catequizando";

enum SimNao {
  SIM = "S",
  NAO = "N",
}

enum TipoSacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

@Entity({ name: "sacramento" })
export class Sacramento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Catequizando)
  @JoinColumn({ referencedColumnName: "id" })
  catequizando!: Catequizando;

  @Column({ type: "char", length: 1, default: SimNao.NAO, nullable: false })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao)
  @IsOptional()
  completo!: string;

  @Column({ type: "char", length: 1, default: null, nullable: false })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(TipoSacramento)
  @IsOptional()
  tipo_sacramento!: string;

  @Column("date")
  @IsDate()
  data_inicio!: Date;

  @Column("date")
  @IsDate()
  data_fechamento!: Date;
}
