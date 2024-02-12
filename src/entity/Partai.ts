import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { Paslon } from "./Paslon"

@Entity({name : "partai"})
export class Partai {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    partyLeader: string

    @Column("text")
    visionMission: string
    
    @Column()
    address: string

    @Column()
    image: string

    @ManyToOne(() => Paslon, (paslon) => paslon.partai, {
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
