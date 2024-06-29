import { model, Schema } from 'mongoose'

export const UserSchema = new Schema(
	{
		uname: { type: String, required: true },
		email: { type: String, required: true },
		name: { type: String, required: true },
		pwd: { type: String, required: true },
		emailVerifiedAt: { type: Date },
		restrictUntil: { type: Date },
		deletedAt: { type: Date },
	},
	{ timestamps: true }
)

const User = model('user', UserSchema)

export default User
