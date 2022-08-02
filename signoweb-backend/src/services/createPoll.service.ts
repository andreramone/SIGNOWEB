import { getRepository } from "typeorm";
import Poll from "../models/Poll";

interface IRequest {
  title: String;
  start: Date;
  end: Date;
}

class CreatePollService {
  public async execute({ title, start, end }: IRequest): Promise<Poll> {
    const enqueteRepository = getRepository(Poll);

    const poll = await enqueteRepository.save({
      title,
      start,
      end,
    });

    return poll;
  }
}

export default CreatePollService;