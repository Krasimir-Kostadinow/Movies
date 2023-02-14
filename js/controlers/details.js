import { getMovie } from '../data.js';
import notificationBox from '../helper.js';
export default async function details(context) {
    const errorBoxEl = document.getElementById('errorBox');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
        context.userInfo = { isLogged: true, username: userInfo.userName }
        try {
            let objectId = context.params.id;
            let result = await getMovie(objectId);

            if (result.errorData) {
                throw new Error(result.message);
            }
   
            context.movie = result;
            if (result.likeds !== null && result.likeds.includes(userInfo.userName)) {
                context.movie.isLiked = true;
            } else {
                context.movie.isLiked = false;
            }


            if (context.movie.ownerId === userInfo.uid) {
                context.movie.isCreator = true;
            } else {
                context.movie.isCreator = false;
            }

        } catch (error) {
            notificationBox(error.message, errorBoxEl);
            return
        }
    }

    this.partials = {
        'header': await this.load('./templates/header.hbs'),
        'notifications': await this.load('./templates/notifications.hbs'),
        'footer': await this.load('./templates/footer.hbs')
    }

    this.partial('./templates/details.hbs')
};