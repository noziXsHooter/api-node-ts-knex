export class UserService {
    getUsers = () => {
        const users = [
            {
                id: "1"
            }
        ]
        return users;
    }

    getUser = (id: number|string) => {
        const user = {}
    }

    createUser = (name: string, email: string, password: string) => {
        const user = {
            name,
            email,
            password
        }
    }

    editUser = (modifiedUser: object) => {
        const user = modifiedUser;
    }
}