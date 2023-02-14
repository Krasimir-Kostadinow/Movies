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
    notificationBox(`Your search has found ${result.length} results.`, successBoxEl);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setTimeout(() => {
        this.redirect('#/home');
    },3000);
 
    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }


};