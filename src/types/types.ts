export type Skill = "Structured programming" | "DevOps" | "Analytical thinking" | 
"Software architecture" | "Information Security" | "Change Management" | 
"Algorithms" | "Company experience" | "Graphics" | "Business Modeling" | 
"SQL" | "Network & system administration" | "Functional programming" | 
"Requirements Analysis" | "C" | "Cryptography" | "Types and data structures" | 
"Team work" | "Code review" | "Shell/Bash" | "Backend" | "Systems Integration" | 
"DB & Data" | "Leadership" | "Python" | "Java" | "Linux" | "C++" | "OOP" | "Parallel computing" | "Web"

export const allSkills: Skill[] = [
    "Structured programming", "DevOps", "Analytical thinking", 
    "Software architecture", "Information Security", "Change Management", 
    "Algorithms", "Company experience", "Graphics", "Business Modeling", 
    "SQL", "Network & system administration", "Functional programming", 
    "Requirements Analysis", "C", "Cryptography", "Types and data structures", 
    "Team work", "Code review", "Shell/Bash", "Backend", "Systems Integration", 
    "DB & Data", "Leadership", "Python", "Java", "Linux", "C++", "OOP", "Parallel computing", "Web"
]

export type orderUserBy = 'name' | 'email' | 'login' | 'phone'

export interface IfindParams {
    page?: any
    take?: any
    skip?: any
    skill?: any
    order?: any
}
