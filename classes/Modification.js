let modificationId = 1;


class Modification{
    /**
     * 
     * @param {int} UserId 
     * @param {str} content
     * @param {str} title
     * @param {str} Category
     */
    constructor(UserId,content,title,category){
        this.id = modificationId;
        modificationId++;
        this.UserId=UserId;
        this.date= new Date();
        this.content=content;
        this.title=title;
        this.category=category;


    }
}

