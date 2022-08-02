import { Router } from "express";
import { getRepository } from "typeorm";
import Poll from "../models/Poll";
import Option from "../models/Option";
import CreatePollService from "../services/createPoll.service";
import CreateOptionService from "../services/createOption.service";

const pollRouter = Router();

pollRouter.post("/", async (request, response) => {
  const { title, start, end, options } = request.body;

  if (options.length < 3) {
    return response.status(500).json({
        status: "error",
        message: "At least 3 options for this poll is needed.",
    });
  }

  const createPollService = new CreatePollService();
  const createPoll = await createPollService.execute({
    title,
    start,
    end,
  });


  const createOptionService = new CreateOptionService();
  options.map(async (option: any) => {
    await createOptionService.execute({
      pollId: createPoll.id,
      title: option.title,
    });
  });

  return response.status(201).json(createPoll);
});

pollRouter.post("/:poll_id/update", async (request, response) => {

  const { title, start, end, options } = request.body;
  const { poll_id } = request.params;

  if (options.length < 3) {
    return response.status(500).json({
      status: "error",
      message: "At least 3 options for this poll is needed.",
    });
  }

  const pollRepository = getRepository(Poll);

  const poll = await pollRepository.findOne(poll_id);

  if (!poll) return response.status(404).json({});

  await pollRepository.update(Number(poll.id), {
    title,
    start,
    end,
  });


  const optionRepository = getRepository(Option);

  const optionsDB = await optionRepository.find({
    where: { pollId: poll_id },
  });


  optionsDB.map(async (optionDB: any) => {
    if (!options.find((option: any) => option.id == optionDB.id)) {
      await optionRepository.remove(optionDB);
    }
  });

  options.map(async (option: any) => {
    if (option.id) {
      const optionExists = await optionRepository.findOne(option.id);
      if (!optionExists) return;

      await optionRepository.update(Number(option.id), {
        title: option.title,
      });
    } else {
      const createOptionService = new CreateOptionService();

      await createOptionService.execute({
        pollId: Number(poll_id),
        title: option.title,
      });
    }
  });

  const returnData = await pollRepository.findOne({
    where: {
      id: poll_id,
    },
    relations: ["options"],
  });

  return response.status(200).json(returnData);
});


pollRouter.post("/:pollId/option", async (request, response) => {
  const { title } = request.body;
  const { pollId } = request.params;

  const createOptionService = new CreateOptionService();

  const createOption = await createOptionService.execute({
    pollId: Number(pollId),
    title,
  });

  return response.status(201).json(createOption);
});


pollRouter.get("/", async (request, response) => {
  const pollRepository = getRepository(Poll);

  const polls = await pollRepository
    .createQueryBuilder()
    .orderBy("created_at", "DESC")
    .getMany();

  return response.status(200).json(polls);
});


pollRouter.get("/:poll_id", async (request, response) => {
  const { poll_id } = request.params;
  const pollRepository = getRepository(Poll);

  const poll = await pollRepository.findOne({
    where: {
      id: poll_id,
    },
    relations: ["options"],
  });

  if (!poll) {
    return response.status(404).json({
      status: "error",
      message: "Cannot find this poll",
    });
  }

  return response.status(200).json(poll);
});

pollRouter.post("/:poll_id/:option_id/vote", async (request, response) => {
  const pollRepository = getRepository(Poll);
  const optionRepository = getRepository(Option);
  const { poll_id, option_id } = request.params;


  const poll = await pollRepository.findOne(poll_id);
  if (!poll) {
    return response.status(404).json({
      status: "error",
      message: "Cannot find this poll",
    });
  }

  const option = await optionRepository.findOne(option_id);
  if (!option) {
    return response.status(404).json({
      status: "error",
      message: "Cannot find this poll",
    });
  }

  await optionRepository.increment({ id: option.id }, "votes", 1);

  const returnData = await pollRepository.findOne({
    where: {
      id: poll_id,
    },
    relations: ["options"],
  });

  return response.status(200).json(returnData);
});

pollRouter.delete("/:poll_id", async (request, response) => {
  const pollRepository = getRepository(Poll);
  const optionsRepository = getRepository(Option);

  const { poll_id } = request.params;

  const poll = await pollRepository.findOne({
    where: {
      id: poll_id,
    },
    relations: ["options"],
  });

  if (!poll) {
    return response.status(404).json({
      status: "error",
      message: "Cannot find this poll",
    });
  }

  const options = await optionsRepository.find({
    where: {
      pollId: poll_id,
    },
  });

  await pollRepository.remove(poll);
  await optionsRepository.remove(options);

  return response.status(200).json({});
});

export default pollRouter;