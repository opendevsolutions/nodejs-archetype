import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Lider } from "./lider";

@Entity(`${process.env.ARQ_DB_NAME}.BANDA`)
export class Banda {

    @PrimaryGeneratedColumn({ name: "BANDA_ID" })
    public id!: number;

    @Column({ name: "BANDA_NOMBRE" })
    public name!: string;

    @Column({ name: "PASSWORD" })
    public password!: number;

    @ManyToOne(() => Lider, leader => leader.band)
    @JoinColumn({name: 'BANDA_LIDER', referencedColumnName: 'id'})
    public leader!: Lider;

    constructor (name: string, password: number) {
        this.name = name;
        this.password = password;
    }
}