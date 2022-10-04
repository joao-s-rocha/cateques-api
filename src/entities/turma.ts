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

enum Status {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

@Entity({ name: "turma" })
export class Turma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ generatedType: "STORED", asExpression: `concat(dia_semana, hora)` })
  descricao!: string;

  @Column({ type: "enum", enum: DiaSemana, nullable: false })
  @IsEnum(DiaSemana, { message: "Enum não correspondente" })
  @IsNotEmpty()
  dia_semana!: string;

  @Column("time")
  @IsNotEmpty()
  hora!: string;

  @Column({ type: "enum", enum: Status, nullable: false })
  @IsEnum(Status, { message: "Enum não correspondente" })
  @IsNotEmpty()
  status!: string;

  @Column({ type: "date", nullable: true })
  @IsDate({ message: "Este campo recebe uma data no formato: dd/mm/aaaa" })
  @IsOptional()
  data_conclusao!: Date;

  @CreateDateColumn()
  data_cad!: Date;
}
