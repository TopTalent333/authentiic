export default class Firestore{

    constructor(cName){
        this.firebaseConfig = {
            apiKey: "AIzaSyA_WfkVZLEg2AdagxQKTj3rBRvk62oke3s",
            authDomain: "authentiic-447de.firebaseapp.com",
            projectId: "authentiic-447de",
            storageBucket: "authentiic-447de.appspot.com",
            messagingSenderId: "1080530713004",
            appId: "1:1080530713004:web:06c8480338861a141aa209",
            measurementId: "G-2QEG995CXJ"
            };
        this.name = cName;
        this.initialize();
    }

    initialize(){
        firebase.initializeApp(this.firebaseConfig);
        firebase.analytics();
        this.db = firebase.firestore();
        this.db.settings({timestampsInSnapshot:true});
    }

    sanitize(input){

         const map = {
           '&': '&amp;',
           '<': '&lt;',
           '>': '&gt;',
           '"': '&quot;',
           "'": '&#x27;',
           "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return input.replace(reg, (match)=>(map[match]));
        

    }

    validate(email) {
        
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
          
    }

    insertMail(mail){
        this.db.collection(this.name).add({
            email: mail
        });
    }

   async check(mail){
    
        const query = this.db.collection(this.name).where('email','==', mail);

        var res = query.get().then(result =>{
            if(!result.empty)
            {
                return true;
            }
            else {
                return false;
            }
        });
        
       var promise = Promise.resolve(res);
       return promise;
        
    
    }

}