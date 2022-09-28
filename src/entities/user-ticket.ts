import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../auth/user";

@Entity()
class UserTicket {
    @PrimaryGeneratedColumn()
    id: string

    @Column({
        type: "enum",
        enum: UserTicketStatus,
        default: UserTicketStatus.CREATED
    })
    status: UserTicketStatus

    @ManyToOne(()=>User)
    user: User

}

export default UserTicket