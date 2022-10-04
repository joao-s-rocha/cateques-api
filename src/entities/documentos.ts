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
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Catequizando } from "./catequizando";

enum SimNao {
  SIM = "S",
  NAO = "N",
}

@Entity({ name: "documentos" })
export class Documentos {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((type) => Catequizando, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id" })
  catequizando!: Catequizando;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: false })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  cpf!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: false })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  rg!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: false })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  comprovante_residencia!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: false })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  admissao!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: false })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  vive_maritalmente!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: false })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  casamento_civil!: string;

  @Column({ type: "enum", enum: SimNao, default: SimNao.NAO, nullable: false })
  @IsEnum(SimNao, { message: "Enum não correspondente" })
  @IsOptional()
  casamento_igreja!: string;
}
