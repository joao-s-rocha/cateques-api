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
