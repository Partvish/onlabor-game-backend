import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import Player from "../entities/player"

@Entity()
class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    email: string
    
    @Column()
    password: string
    
    @JoinColumn()
    @OneToOne(()=>Player)
    player: Player
    
    // @Column()
    // @OneToMany("tickets", "user")
    // tickets: UserTicket

    User(){}
    
}

export default User
