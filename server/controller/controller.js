import mongoose from "mongoose";
import DischargeSummary from "../models/dischargeSummary.js";

export const getSummaries = async (req, res) => {
  try {
    const summaries = await DischargeSummary.find();

    return res.status(200).json(summaries);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message });
  }
};

// export const getSummary = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const summary = await DischargeSummary.findById(id);

//     return res.status(200).json(summary);
//   } catch (error) {
//     console.error(error);
//     return res.status(404).json({ message: error.message });
//   }
// };

export const createSummary = async (req, res) => {
  const summary = req.body;

  const newSummary = new DischargeSummary(summary);

  try {
    console.log("creating...");
    await newSummary.save();
    return res.status(201).json(newSummary);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateSummary = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedSummary = { ...data, _id: id };

  await DischargeSummary.findByIdAndUpdate(id, updatedSummary, { new: true });

  res.json(updatedSummary);
};

export const deleteSummary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await DischargeSummary.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};
