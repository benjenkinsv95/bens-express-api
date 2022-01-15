const mongoose = require('mongoose')
const moment = require('moment')

const practiceSchema = new mongoose.Schema(
  {
    // how many minutes to practice each day
    minutesGoal: { type: Number, default: 0 },
    streakStart: Date,
    lastPracticed: Date,
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

practiceSchema.virtual('daysStreak').get(function () {
  // if we've never practiced there isnt a streak
  if (!this.lastPracticed || !this.streakStart) {
    return 0
  }

  // convert dates into momentjs
  const todayMoment = moment()
  const yesterdayMoment = moment().subtract(1, 'day')
  const lastPracticedMoment = moment(this.lastPracticed)
  const streakStartMoment = moment(this.streakStart)

  const isToday = lastPracticedMoment.isSame(todayMoment, 'day')
  const isYesterday = lastPracticedMoment.isSame(yesterdayMoment, 'day')

  // if the we haven't practiced today or yesterday, there isn't a streak
  if (!isToday && !isYesterday) {
    return 0
  }

  // add 1 for the day the streak started
  return 1 + lastPracticedMoment.diff(streakStartMoment, 'days')
})

module.exports = mongoose.model('Practice', practiceSchema)
