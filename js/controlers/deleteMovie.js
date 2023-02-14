import { deleteMovie } from "../data.js";
import notificationBox from "../helper.js";

export default async function delMovie(context) {
    const errorBoxEl = document.getElementById('errorBox');
    const successBoxEl = document.getElementById('successBox');
    const objectId = context.params.id;
    try {
        const result = await deleteMovie(objectId);
        if (result.errorData) {
            throw new Error(result.message);
        }
        notificationBox('Deleted successfully', successBoxEl);
        setTimeout(() => {
            this.redirect('#/home');
        }, 3000);
    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }


}