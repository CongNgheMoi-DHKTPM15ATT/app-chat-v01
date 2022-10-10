const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  user_name: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  avatar: { type: String },
  birth_day: { type: Date, default: Date.now },
  list_friends: { type: [{ user_id: { type: Schema.Types.ObjectId, ref: 'User' }, pending: Boolean }], default: [] },
  list_user_advices: { type: [{ type: String, }], default: [] },
  list_user_blocks: { type: [{ type: String, }], default: [] }


}, { timestamps: true })

module.exports = model("User", UserSchema);