import { getAllMovies } from "../data.js";
export default async function home(context) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
        context.userInfo = { isLogged: true, username: userInfo.userName };
        context.searchMovies = userInfo.searchMovies;
        const movies = await getAllMovies();
        if (movies !== []) {
            context.movies = movies;
        }
    } else {
        userInfo = {};
    }

    this.partials = {
        'header': await this.load('./templates/header.hbs'),
        'notifications': await this.load('./templates/notifications.hbs'),
        'card': await this.load('./templates/card.hbs'),
        'footer': await this.load('./templates/footer.hbs')
    }

    this.partial('./templates/home.hbs');
    userInfo.searchMovies = null;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};
