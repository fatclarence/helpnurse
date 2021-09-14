import mongoose from "mongoose";

const dischargeSummary = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  dischargeDatetime: {
    type: Date,
    default: new Date(),
  },
  patientName: String,
  creatorName: String,
  ic: String,
  allergies: { type: [String], default: [] },
  temperature: mongoose.Schema.Types.Decimal128,
  bloodPressure: String,
  heartRate: Number,
  respiratoryRate: Number,
  spoTwo: Number,
  diagnosis: String,
  appointments: {
    type: {
      dateTime: {
        type: Date,
        default: new Date(),
      },
      location: String,
    },
    default: null,
  },
  medications: {
    type: [
      {
        name: String,
        frequency: String,
        specialInstructions: String,
      },
    ],
    default: [],
  },
});

const DischargeSummary = mongoose.model("DischargeSummary", dischargeSummary);

export default DischargeSummary;
