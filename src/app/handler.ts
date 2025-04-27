import { Request, Response } from "express";
import type { IfindParams, Skill } from "../types/types";
import { Service } from "./service";
import { seed } from "../seed";

export const Handler = {
    async getStudents(req: Request, res: Response) {
        try {
            const { take, skill, order, page } = req.query;
            const payload: IfindParams = { take, skill, order, page }
            const result = await Service.getStudents(payload);
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).send({message: 'Something went wrong'});
        }
    },

    async getSkills(req: Request, res: Response) {
        try {
            const result = (await Service.getSkills()).map(skill => Object.values(skill)[0]);
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).send({message: 'Something went wrong'});
        }
    }
}