import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Skill } from './skill';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text" })
    login: string;

    @Column({ type: "text" })
    phone: string;

    @OneToMany((type) => Skill, (skill) => skill.student)
    skills: Skill[]
}
