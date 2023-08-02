import { Document, model, Schema } from "mongoose";

interface IMoviesDocument extends Document {
    name: string,
    createdAt: Date,
    updatedAt: Date
}

const MoviesSchema = new Schema<IMoviesDocument>({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, {timestamps: true, versionKey: false})

const MoviesModel = model<IMoviesDocument>('Movies', MoviesSchema)

export default MoviesModel