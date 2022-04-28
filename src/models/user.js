let mongoose = require('mongoose')
let Schema = mongoose.Schema

/*
 * A "User" or "Account" model for MyInvestmentPlatform.
 */
const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  businessType: { type: String },  // "INDIVIDUAL", "JOINT", "ENTITY", or "TRUST"
  sponsor: { type: String },
  checkInvestorStatusId: { type: String },
})

module.exports = mongoose.model('User', UserSchema)
