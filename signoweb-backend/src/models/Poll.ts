import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  JoinTable,
} from "typeorm";
import Option from "./Option";

  
  @Entity("poll")
  class Poll {
    @PrimaryGeneratedColumn("increment")
    id: Number;
  
    @Column()
    title?: String;
  
    @Column()
    start: Date;
  
    @Column()
    end: Date;
  
    @OneToMany(() => Option, (option) => option.poll, { cascade: true })
    
    @JoinTable()
    options: Option[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Poll;
  