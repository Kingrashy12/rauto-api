import { productdata } from "../listing.js";

const feedback = [];

export const addFeedBack = async (req, res) => {
  const { userId, name, body } = req.body;
  const { listId } = req.params;
  try {
    const feed = { userId, name, body };
    const feedb = feedback.push(feed);
    res.status(201).json(feedback);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getList = async (req, res) => {
  try {
    const List = feedback;
    res.status(200).json(List);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
