import * as Firebase from 'firebase';


    export async function register(User: any) {
        
      console.log('register user');

      let userRegister: any;

      try {
      userRegister = await Firebase.auth().createUserWithEmailAndPassword(User.email, User.password);
      await Firebase.auth().signInWithEmailAndPassword(User.email, User.password);
      await Firebase.auth().currentUser.sendEmailVerification();
      } catch(error) {
          console.log(error);
      }

      return userRegister; 
    }

    export function loginWithGoogle() {
      const provider = new Firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      return Firebase.auth().signInWithPopup(provider);
    }

    export function loginWithEmail(email: string, password: string) {
      return Firebase.auth().signInWithEmailAndPassword(email, password);
    }

    export function logout() {
      return Firebase.auth().signOut();
    }
