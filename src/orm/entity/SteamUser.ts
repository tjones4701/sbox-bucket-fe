import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SteamUser {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    steam_id: string;

    @Column({ type: 'timestamptz' })
    created: Date;
}