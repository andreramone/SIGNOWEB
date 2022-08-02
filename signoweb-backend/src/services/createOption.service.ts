import { getRepository } from "typeorm";
import Option from "../models/Option";
import Poll from "../models/Poll";

interface IRequest {
  pollId: Number;
  title: String;
}

class CreateOptionService {
  public async execute({ pollId, title }: IRequest): Promise<Option | void> {
    const optionRepository = getRepository(Option);
    const pollRepository = getRepository(Poll);

    const pollExists = await pollRepository.findOne(Number(pollId));

    if (!pollExists) {
      return;
    }

    const option = await optionRepository.save({
      pollId,
      title,
      votes: 0,
    });

    return option;
  }
}

export default CreateOptionService;