![Image](https://github.com/user-attachments/assets/f8e01076-2b85-43cf-a117-d3686b6077c4)
# Техническая документация
## Установка и настройка
1. Установка
```bash
git clone https://github.com/Erokez0/Hackaton-21school
npm install
```
2. Запуск
```bash
npm run start
```
API запускаяется на http://localhost:3000/api

Сервис запускается на http://localhost:3000/

## Описание API
### Эндпоинты
GET ```/api/allStudent?take=x&skill=&page=x&order=x``` - Все студенты с фильтрами
query параметры
- take - Количество
- skill - Интересующий навык
- page - Номер страницы
- order - Порядок сортировки

GET ```/api/skills``` - Все навыки

## Структура БД
### Студенты
```TypeScript
    id: INT PK UQ
    name: VARCHAR
    email: VARCHAR
    login: VARCHAR
    phone: VARCHAR

    OneToMany
    skills: Skill[]
```
### Скиллы
```TypeScript
    id: INT PK UQ
    name: VARCHAR
    points: INT

    ManyToOne
    student: Student
```
