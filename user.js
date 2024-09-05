class User{
    constructor(){
        this.name = "";
        this.posts = [];
    }


    register(name){
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

export default User;