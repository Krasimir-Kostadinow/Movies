
import notificationBox from '../helper.js'
import { registerUser } from '../data.js';
export default async function register(context) {

    this.partials = {
        'header': await this.load('./templates/header.hbs'),
        'notifications': await this.load('./templates/notifications.hbs'),
        'footer': await this.load('./templates/footer.hbs')
    }

    this.partial('./templates/register.hbs')
};



export async function postRegister(context) {
    const errorBoxEl = document.getElementById('errorBox');
    const successBoxEl = document.getElementById('successBox');
    const { username, password, repeatPassword } = this.params;

    function validation(username, password, rePassword) {
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
        if (password !== rePassword) {
            isValid = false;
            content = 'Password and repeat Password not match.';
            return { isValid, content };
        }

        return { isValid, content };

    }

    const { isValid, content } = validation(username, password, repeatPassword);

    if (!isValid) {
        notificationBox(content, errorBoxEl);
        return;
    }

    try {
        let result = await registerUser(username, password);
    
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }
        notificationBox('Successful registration!', successBoxEl);
        this.redirect('#/login');

    } catch (error) {
        notificationBox(error.message, errorBoxEl);
    }



}