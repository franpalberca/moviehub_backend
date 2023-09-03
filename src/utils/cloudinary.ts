import {v2 as cloudinary} from 'cloudinary';
import config from '../config/config';

cloudinary.config({
	cloud_name: config.cloudinary.cloudinary_name,
	api_key: config.cloudinary.cloudinary_api_key,
	api_secret: config.cloudinary.cloudinary_api_secret,
	secure: true,
});

export const uploadImage = async (path: any) => {
	return await cloudinary.uploader.upload(path, {folder: 'imageMovies'});
};

export const deleteImage = async (imageID: string) => {
	return await cloudinary.uploader.destroy(imageID);
};
