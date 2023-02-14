import { likedMovie } from "../data.js";
import notificationBox from "../helper.js";


export default async function lickeMovie(context) {
    const errorBoxEl = document.getElementById('errorBox');
    const successBoxEl = document.getElementById('successBox');
    const objectId = context.params.id;
    try {
        let result = await likedMovie(objectId);
        if (result.errorData) {
            throw new Error(result.message);
        }
        notificationBox('Liked successfully', successBoxEl);
        setTimeout(() => {
            this.redirect(`#/details/${objectId}`)
        }, 1500);
    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }

};

