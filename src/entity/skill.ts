import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student";
@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "int" })
    points: number;

    @ManyToOne((type) => Student, (student) => student.skills, { onUpdate: 'CASCADE', nullable: true, cascade: true })
    student: Student
}