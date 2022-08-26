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
  PrimaryGeneratedColumn,
} from "typeorm";

enum SimNao {
  SIM = "S",
  NAO = "N",
}

enum Sacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

@Entity({ name: "sacramento" })
export class Catequizando {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 120 })
  @IsInt({ message: "Este campo recebe um inteiro" })
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  pessoa_id!: string;

  @Column({ type: "char", length: 1, default: SimNao.NAO, nullable: false })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(SimNao)
  @IsOptional()
  completo!: string;

  @Column({ type: "char", length: 1, default: null, nullable: false })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracter" })
  @IsEnum(Sacramento)
  @IsOptional()
  tipo_sacramento!: string;

  @Column("date")
  @IsDate()
  data_inicio!: Date;

  @Column("date")
  @IsDate()
  data_fechamento!: Date;
}
