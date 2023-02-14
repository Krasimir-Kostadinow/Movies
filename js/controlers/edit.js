import { editMovie, getMovie } from "../data.js";
import notificationBox from "../helper.js";

export default async function edit(context) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const errorBoxEl = document.getElementById('errorBox');

    if (userInfo) {
        context.userInfo = { isLogged: true, username: userInfo.userName };
        const objectId = context.params.id;

        try {
            const movie = await getMovie(objectId);

            context.movie = movie;
            if (movie.errorData) {
                throw new Error(movie.message);
            }
        } catch (error) {
            notificationBox(error.message, errorBoxEl);
        }
    }

    this.partials = {
        'header': await this.load('./templates/header.hbs'),
        'notifications': await this.load('./templates/notifications.hbs'),
        'footer': await this.load('./templates/footer.hbs')
    }

    this.partial('./templates/editMovie.hbs')
};


export async function postEdit(context) {
    const errorBoxEl = document.getElementById('errorBox');
    const successBoxEl = document.getElementById('successBox');
    const { title, description, imageUrl, id } = this.params;

    if (title === '' || description === '' || imageUrl === '') {
        notificationBox('Invalid inputs!', errorBoxEl);
        return;
    }

    try {
        const result = await editMovie(id, title, description, imageUrl);

        if (result.errorData) {
            throw new Error(result.message);
        }
        notificationBox('Eddited successfully!', successBoxEl);
        setTimeout(() => {
            this.redirect(`#/details/${id}`);
        }, 3000);

    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }
}