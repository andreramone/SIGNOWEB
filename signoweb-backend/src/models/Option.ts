import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import Poll from "./Poll";

@Entity("option")
  class Option {

    @PrimaryGeneratedColumn("increment")
    id: Number;
  
    @Column()
    pollId: Number;
  
    @Column()
    title?: String;

  
    @Column()
    votes: Number;
  
    @ManyToOne(() => Poll, (poll) => poll.options, {
      onDelete: "CASCADE",
    })

    @JoinColumn()
    poll: Poll;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Option;