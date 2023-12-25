import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dhg3ntmsc',
    api_key: '273456946722689',
    api_secret: 'bIOQ0p8Xp87KTC3ARlxw2M71RLw'
});

export const sendImageToCloudinary = (imageName: string, path: string) => {

};