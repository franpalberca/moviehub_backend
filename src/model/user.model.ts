import {Response, Request} from 'express';
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
			unique: true,
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

UserSchema.pre('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;

	next();
});

UserSchema.methods.comparePassword = async function (password: string):Promise<boolean> {
	return await bcrypt.compare(password, this.password);
}

export const authenticateUser = async (req: Request, res: Response) => {
	const {email, password} = req.query;

	try {
		const foundUser = await UserModel.findOne({email});

		if (foundUser) {
			const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
			if (isPasswordCorrect) {
				res.json({isAuthenticated: true});
			} else {
				res.json({isAuthenticated: false});
			}
		} else {
			res.json({isAuthenticated: false});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;
