import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRoleType = "admin" | "user" 

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: ["admin", "user"],
        default: ["user"]
    })
    role: UserRoleType

    @Column({
        default: false,
    })
    isActive: boolean
    
}