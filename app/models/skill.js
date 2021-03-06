const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    // url to review the skill
    reviewUrl: String,
    // url to practice the skill
    practiceUrl: String,
    public: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Skill', skillSchema)
