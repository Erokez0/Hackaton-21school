import { Student } from "./entity/student";
import { Skill } from "./entity/skill";
import { AppDataSource } from "./data_source/datasource";
import { createReadStream } from "node:fs";
import * as csv from 'fast-csv';

type Data = {
    'Почта': string
    'Логин': string
    'ФИО': string
    'Телефон': string
}[]
export async function parseCSV(): Promise<Data> {
    let result: Data = [];
    return new Promise((resolve, reject) => {
        createReadStream('./src/static/users.csv')
            .pipe(csv.parse({ delimiter: ';', headers: true }))
            .on('error', error => reject(error))
            .on('data', row => {
                delete row[''];
                result.push(row);
            })
            .on('end', () => {
                resolve(result);
            })
    })

}
async function getSkills(login: string) {
    const response = await fetch(`https://edu-api.21-school.ru/services/21-school/api/v1/participants/${login}/skills`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5V29landCTmxROWtQVEpFZnFpVzRrc181Mk1KTWkwUHl2RHNKNlgzdlFZIn0.eyJleHAiOjE3NDU3MDcyNTQsImlhdCI6MTc0NTY3MTI1NCwianRpIjoiYjc4YWQ5YjAtOTg4NC00M2U3LTkxMDItOGI5OWE2OGYyNDlmIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNiZXJjbGFzcy5ydS9hdXRoL3JlYWxtcy9FZHVQb3dlcktleWNsb2FrIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjgwNDkyNzMwLTVkOTctNGIzOS1iYTM2LWRkMWI1MzVhNzdkMSIsInR5cCI6IkJlYXJlciIsImF6cCI6InMyMS1vcGVuLWFwaSIsInNlc3Npb25fc3RhdGUiOiJjZDk1OGUxZC0yM2U3LTRkMTItYmFlZS04ODY5YjM5Y2NlYzUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vZWR1LjIxLXNjaG9vbC5ydSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lZHVwb3dlcmtleWNsb2FrIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1c2VyX2lkIjoiMGFhY2YyNTgtYTZiZS00OWU2LTk1MzYtOTIwNzU3YThkNThjIiwibmFtZSI6IkRhbm5pZWxsZSBPa3JhIiwiYXV0aF90eXBlX2NvZGUiOiJkZWZhdWx0IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFubmllbG8iLCJnaXZlbl9uYW1lIjoiRGFubmllbGxlIiwiZmFtaWx5X25hbWUiOiJPa3JhIiwiZW1haWwiOiJkYW5uaWVsb0BzdHVkZW50LjIxLXNjaG9vbC5ydSJ9.VtUzQIC5B30BSTNS0RzksF3ne2A-b12D3gsl18MF5fiBjI1vi8RefYt-hzO0vJWNfnw9QYekJPoB4Y_-LCOCuWpA3Cm7qw17pfygRl-Rs1XqNpqm_qhBI6e3vcMEJ8W3W1IEwyFh8lEyS54W4vwx5xRFxlLf1pqxc4Xe1tUCz4wZzRvMKf7JQTJFFxf2RajRemM06Cc8BiJHz6F_fnBM9Z62TBPhSkB5BMlrvQG-37Ig36ibbYeZYDN357a2ixdJA_1ne2fuUj3xOcreq2VxocGbQyp8SQf5QbICBMZsgXlAJsOZtzDrsXO4K1exGJzaCECwI3hgCf4PGg7hncHAhg"
        }
    });
    if (response.ok) {
        return (await response.json())['skills'];
    }
    throw new Error(response.statusText);
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
export async function seed(limit = 100): Promise<void> {
    const studentRepository = AppDataSource.getRepository(Student);
    const skillRepository = AppDataSource.getRepository(Skill);
    const data: Data = await parseCSV();
    return new Promise<void>(async (resolve, reject) => {
        let ix = 0;

        try {
            for (const user of data) {
                if (ix > limit) {
                    break;
                }
                const login = user['Логин'];

                let skills: Skill[];
                try {
                    skills = await getSkills(login);
                } catch (e) {
                    console.log(e.message);
                    continue
                }
                const skillEntities = skills.map( async (skill) => await skillRepository.save(skill) );
                const student = studentRepository.create({
                    name: user['ФИО'],
                    email: user['Почта'],
                    login: login,
                    phone: '+' + user['Телефон'],
                    skills: await Promise.all(skillEntities)
                });
                await studentRepository.save(student);
                ix++
                await sleep(10000);
                console.log(`seeded - ${student.name} - ${ix}/${limit}`);
            }
            resolve();
        } catch (e) {
            console.log(e);
            reject()
        }
    })

}