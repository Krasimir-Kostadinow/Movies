import home from './controlers/home.js';
import login, { postLogin } from './controlers/login.js';
import register, { postRegister } from './controlers/register.js';
import create, { postCreate } from './controlers/create.js';
import details from './controlers/details.js';
import edit, { postEdit } from './controlers/edit.js';
import logout from './controlers/logout.js';
import delMovie from './controlers/deleteMovie.js';
import likeMovie from './controlers/like.js';
import search from './controlers/search.js';



window.addEventListener('load', function () {

    const router = Sammy('#container', function (context) {

        this.use('Handlebars', 'hbs');

        //GET
        this.get('#/home', home);
        this.get('#/register', register);
        this.get('#/login', login);
        this.get('#/logout', logout);
        this.get('#/create', create);
        this.get('#/details/:id', details);
        this.get('#/delete/:id', delMovie);
        this.get('#/edit/:id', edit);
        this.get('#/like/:id', likeMovie);
        this.get('#/search', search);

        //POST
        this.post('#/register', context => {
            postRegister.call(context);
        });
        this.post('#/login', function (context) {
            postLogin.call(context);
        });

        this.post('#/create', context => {
            postCreate.call(context);
        });
        this.post('#/edit/:id', context => {
            postEdit.call(context);
        });
        // this.post('#/search', context => {
        //     search.call(context);
        // });



    });

    (() => {
        router.run('#/home');
    })();
});
