const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);

const TestResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfTestsTaken: {
    type: Number,
    required: true,
  },
  averageTestResult: {
    type: Number,
    required: true,
  },
  failedCharacters: [
    {
      type: String,
      required: false,
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TestResult", TestResultSchema, "TestResults");
