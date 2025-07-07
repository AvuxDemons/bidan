interface User extends DefaultData {
    name: string
    email: string
    image: string
    emailVerified: boolean | null
}