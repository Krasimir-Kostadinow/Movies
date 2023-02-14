import { logoutUser } from '../data.js'
import notificationBox from '../helper.js';


export default async function logout(context) {
   const errorBoxEl = document.getElementById('errorBox');
   const successBoxEl = document.getElementById('successBox');
   try {
      let result = await logoutUser();

      if (result.status > 200) {
         throw new Error('Not successful logout');
      }
      notificationBox('Successful logout', successBoxEl);
      setTimeout(() => {
         this.redirect('#/home');
      }, 3000);

   } catch (error) {
      notificationBox(error.message, errorBoxEl);
   }


};

