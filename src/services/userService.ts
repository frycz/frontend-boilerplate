import * as Firebase from 'firebase';


    export async function register(User: any) {
        /*
      console.log('register user');

      let userRegister: any;

      try {
      userRegister = await Firebase.auth().createUserWithEmailAndPassword(User.email, User.password);
      await Firebase.auth().signInWithEmailAndPassword(User.email, User.password);
      await Firebase.auth().currentUser.sendEmailVerification();
      } catch(error) {
          console.log(error);
      }

      return userRegister; */
    }

    export function login(email: string, password: string) {
      console.log('login user');
      const userLogin = Firebase.auth().signInWithEmailAndPassword(email, password);

      userLogin.then(function(data) {
        console.log(data);
      },
      function(error){
        console.log(error);
      });

      return userLogin;

      //console.log('login completed');
    }

    export function logout() {
      console.log('login user');
      const userLogout = Firebase.auth().signOut();

      userLogout.then(function() {
        // Sign-out successful.
      }, function(error) {
        // An error happened.
      });

      return userLogout;

      //console.log('login completed');
    }
