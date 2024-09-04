class Post{
    constrcutor(title, text, attachments, author){
        this.title = title;
        this.text = text;
        this.attachments = attachments;
        this.author = author;

        this.replies = [];
    }

    constructor(title, text, author){
        this.title = title;
        this.text = text;
        this.attachments = [];
        this.author = author;

        this.replies = [];
    }

    addReply(message){
        this.replies.push(message);
    }

}

export default Post;