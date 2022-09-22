import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../auth/user";

@Entity()
class Player{
    @PrimaryGeneratedColumn()
    id: string
    
}

export default Player