export type Book = {
    id?: number
    title: string
    description: string
    is_private: boolean
    user_id?: number
    cover_id?: number
    created_at?: Date
    updated_at?: Date
    user?: User
}

export type User = {
    id: number
    name: string
    email: string
    email_verified_at?: Date
    password: string
    icon_path: string
    created_at: Date
    updated_at: Date
}