import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Paslon } from "./Paslon"
import { User } from "./User"

@Entity({name:"votes"})
export class Vote {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, (users) => users.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user : User

    @ManyToOne(() => Paslon , (paslon) => paslon.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    paslon : Paslon

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}