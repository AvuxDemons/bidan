interface User extends DefaultData {
    id: string
    name: string
    email: string
    image: string
    emailVerified: boolean | null
    keluargaId?: string
}
