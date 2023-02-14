import { addMovie } from "../data.js";
import notificationBox from "../helper.js";

export default async function create(context) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
        context.userInfo = { isLogged: true, username: userInfo.userName };
    }

    this.partials = {
        'header': await this.load('./templates/header.hbs'),
        'notifications': await this.load('./templates/notifications.hbs'),
        'footer': await this.load('./templates/footer.hbs')
    }

    this.partial('./templates/addMovie.hbs');

};

export async function postCreate() {
    const errorBoxEl = document.getElementById('errorBox');
    const successBoxEl = document.getElementById('successBox');
    const { title, description, imageUrl } = this.params;

    if (title === '' || description === '' || imageUrl === '') {
        notificationBox('Invalid inputs!', errorBoxEl);
        return;
    }

    try {
        const result = await addMovie(title, description, imageUrl);

        if (result.errorData) {
            throw new Error(result.message);
        }
        notificationBox('Created successfully!', successBoxEl);
        setTimeout(() => {
            this.redirect('#/home');
        }, 3000);

    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }
    
};