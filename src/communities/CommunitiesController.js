import e from "express";
import CommunitiesController from "./communitiesUseCases.js";

class CommunitiesController {
  async createCommunity(req, res) {
    const userId = req.user.id;
    const dataFields = req.body;

    try {
      const community = await CommunitiesController.execute(dataFields, userId);
      return res.status(201).json(community);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CommunitiesController();
