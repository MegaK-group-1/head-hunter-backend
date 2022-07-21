import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class HRAgent {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id'
    })
    id: number;

    @Column({
        nullable: false,
        default: ''
    })
    hrAgentName: string;

    @Column({
        nullable: false,
        default: ''
    })
    hrAgentPassword: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: ''
    })
    hrAgentEmailAddress: string;
}
