import {BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm"

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
    
    // @Column()
    // @OneToOne("user")
    // player: Player
    
    // @Column()
    // @OneToMany("tickets", "user")
    // tickets: UserTicket

    User(){}
    
}

export default User
