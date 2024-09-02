class User{
    constructor(){
        this.name = "";
        this.posts = {};
    }

    addPost(post){
        
    }

    register(name){
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

export default User;