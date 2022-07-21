import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        default: ''
    })
    username: string;

    @Column({
        nullable: false,
        default: ''
    })
    password: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: ''
    })
    emailAddress: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
