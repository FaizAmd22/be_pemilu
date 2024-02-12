import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Partai } from "./Partai"
import { Vote } from "./Vote"

@Entity({name : "paslon"})
export class Paslon {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("text")
    visionMission: string

    @Column()
    image: string

    @OneToMany(() => Vote, (vote) => vote.paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
    )
    vote : Vote

    @OneToMany(() => Partai, (partai) => partai.paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    partai : Partai[]

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
