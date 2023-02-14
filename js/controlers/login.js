import notificationBox from "../helper.js";
import { loginUser } from "../data.js";
export default async function login(context) {

    this.partials = {
        'header': await this.load('./templates/header.hbs'),
        'notifications': await this.load('./templates/notifications.hbs'),
        'footer': await this.load('./templates/footer.hbs')
    }

    this.partial('./templates/login.hbs')
};

export async function postLogin(context) {

    const errorBoxEl = document.getElementById('errorBox');
    const successBoxEl = document.getElementById('successBox');
    const { username, password } = this.params;


    function validation(username, password) {
        let isValid = true;
        let content = '';
        if (username.length <= 0) {
            isValid = false;
            content = 'The Username field must be filled.';
            return { isValid, content };
        }
        if (password.length < 6) {
            isValid = false;
            content = 'Password must be longer than 6 characters.';
            return { isValid, content };
        }

        return { isValid, content };

    }

    const { isValid, content } = validation(username, password);

    if (!isValid) {
        notificationBox(content, errorBoxEl);
        return;
    }

    try {
        let result = await loginUser(username, password);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        notificationBox('Login successful.', successBoxEl);
        setTimeout(() => {
            this.redirect('#/home');
        }, 3000);




    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }
};