import { searchMovie } from "../data.js";
import notificationBox from "../helper.js";

export default async function search(context) {
    const errorBoxEl = document.getElementById('errorBox');
    const successBoxEl = document.getElementById('successBox');
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const { searchName } = this.params;

    try {
        let result = await searchMovie(searchName);
        if (result.errorData) {
            throw new Error(result.message);
        }

        userInfo.searchMovies = result;
        if (result.length > 0) {
            notificationBox(`Found ${result.length} movies with the title ${searchName}`, successBoxEl);
            setTimeout(() => {
                this.redirect('#/home');
            }, 3000);
        } else {
            notificationBox(`Found ${result.length} movies with the title ${searchName}`, errorBoxEl);
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      

    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }


};