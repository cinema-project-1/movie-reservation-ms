import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column({type: 'varchar', nullable: false})
    synopsis: string;

    @Column({type: 'varchar', nullable: false})
    status: string;

    @Column({default: true})
    isActive: boolean;

    @Column({type: 'varchar', nullable: false})
    director: string;

    @Column({type: 'integer', nullable: false})
    duration: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;     
}
