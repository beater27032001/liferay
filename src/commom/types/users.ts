export interface Users {
    id: string
    name: string
    email: string
    password: string
    campaigns: string[]
    donations: string[]
    role: 'admin' | 'user'
}