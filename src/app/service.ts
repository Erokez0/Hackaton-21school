import { Student } from "../entity/student";
import { Skill } from "../entity/skill";
import { AppDataSource } from "../data_source/datasource";
import { allSkills, IfindParams } from "../types/types";
import { And, Any, ArrayContains, In, IsNull, Like, Not } from "typeorm";
const studentRepository = AppDataSource.getRepository(Student);
const skillRepository = AppDataSource.getRepository(Skill);


export const Service = {
    async getStudents(params: IfindParams): Promise<Student[]> {
        console.log(params)
        let page = params.page? +params.page : 1;
        let take = params.take? +params.take : 100;
        if (take < 0) {
            take = 100
        }
        const orderOptions = ['ASC', 'DESC', 'asc', 'desc'];
        // const skillOptions: string[] = allSkills;
        let skill  = params.skill? decodeURIComponent(params.skill) : null;
        console.log(skill)
        let orderBy: 'ASC' | 'DESC' | 'asc' | 'desc' = orderOptions.includes(params.order)? params.order : 'DESC';

        let where = {
    
        };
        if (skill !== null) {
            where = {
                skills: {
                    name: skill
                }
            }
        }
        let order = {};
        if (skill && orderBy) {
            order = {
                skills: {
                    points: orderBy
                }
            }
        }
        return await studentRepository.find({
            select: {
                id: false,
                skills: {
                    id: false,
                    name: true,
                    points: true
                }
            },
            where: where,
            relations: { skills: true },
            take: take,
            skip: take*(page-1),
            order: order
        });
    },

    async getSkills(): Promise<Skill[]> {
        return await skillRepository.createQueryBuilder('skill').select('skill.name').distinct(true).getRawMany();
    },
}