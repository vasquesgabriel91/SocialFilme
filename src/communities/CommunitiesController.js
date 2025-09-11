import e from "express";
import CommunitiesUseCase from "./communitiesUseCase.js";

class CommunitiesController {
  async createCommunity(req, res) {
    const userId = req.user.id;
    const dataFields = req.body;

    try {
      const community = await CommunitiesUseCase.execute(dataFields, userId);
      return res.status(201).json(community);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CommunitiesController();
