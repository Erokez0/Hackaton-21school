import { AppDataSource } from "../data_source/datasource";
import 'reflect-metadata'
import express from 'express'
import { Handler } from "./handler";
import cors from 'cors'

await AppDataSource.initialize()


export const app = express();
const backendRouter = express.Router();

app.use(express.static('public'));
app.use('/api', backendRouter);
app.use(cors())

backendRouter.get('/allStudents', Handler.getStudents);
backendRouter.get('/skills', Handler.getSkills)


app.get('/skills', (req, res) => {
    res.sendFile('skills.html', { root: './src/public' });
});
app.get('/', (req, res) => {
    res.sendFile('main.html', { root: './src/public' });
});
app.get('/student/:id', (req, res) => {
    res.sendFile('main.html', { root: './src/public' });
});
