import {Document, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

interface IUserDocument extends Document {
	name: string;
	email: string;
	password: string;
	movies?: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		movies: {
			type: [{type: Schema.Types.ObjectId, ref: 'Movies'}],
		},
	},
	{timestamps: true, versionKey: false}
);

UserSchema.pre('save', async function(next){
	const user = this;
	if (!user.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;

	next()
})

// UserSchema.methods.comparePassword = async function (password: string):Promise<boolean> {
// 	return await bcrypt.compare(password, this.password);
// }

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;
