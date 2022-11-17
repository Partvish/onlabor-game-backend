import { AppDataSource } from '../database'
import LoginDto from '../dtos/login.dto'
import UserDto from '../dtos/user.dto'
import { getToken } from './token'
import User from './user'
export default class AuthService {
    repository = AppDataSource.getRepository(User)

    async loginUser(login: LoginDto) {
        var user = await this.repository.findOneBy({ email: login.email })
        if (user && user.password == login.password)
            return getToken(user.id, user.email)
    }

    async registerUser(userDto: UserDto) {
        var user = await this.repository.findOneBy({ email: userDto.email })
        if (user != null)
            throw Error("User already registered")
        user = new User()
        user.email = userDto.email
        user.name = userDto.name
        user.password = userDto.password
        this.repository.save(user)
    }

}