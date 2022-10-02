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
  Unique,
} from "typeorm";
// import { Catequizando } from "./catequizando";
// import { Catequizando } from "./catequizando";

enum TipoSacramento {
  EUCARISTIA = "E",
  CRISMA = "C",
  BATISMO = "B",
}

enum DiaSemana {
  DOMINGO = "DOMINGO",
  SEGUNDA = "SEGUNDA",
  TERCA = "TERCA",
  QUARTA = "QUARTA",
  QUINTA = "QUINTA",
  SEXTA = "SEXTA",
  SABADO = "SABADO",
}

@Entity({ name: "turma" })
export class Turma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ generatedType: "STORED", asExpression: `concat(dia_semana, hora)` })
  descricao!: string;

  @Column({ type: "enum", enum: TipoSacramento, nullable: false })
  @MaxLength(1, { message: "Tamanho máximo para esse campo é de 1 caracteres" })
  @MinLength(1, { message: "Tamanho máximo para esse campo é de 1 caracteres" })
  @IsEnum(TipoSacramento, { message: "Enum não correspondente" })
  @IsNotEmpty()
  tipo_sacramento!: string;

  @Column({ type: "enum", enum: DiaSemana, nullable: false })
  @MaxLength(8, { message: "Tamanho máximo para esse campo é de 8 caracteres" })
  @MinLength(5, { message: "Tamanho máximo para esse campo é de 5 caracteres" })
  @IsEnum(DiaSemana, { message: "Enum não correspondente" })
  @IsNotEmpty()
  dia_semana!: string;

  @Column("time")
  @IsNotEmpty()
  hora!: string;

  @Column({ type: "date", nullable: true })
  @IsDate()
  @IsOptional()
  data_conclusao!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
