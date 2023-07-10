export class Todo {
    public _id: string;
    public id: string;
    public name: string;


    constructor(_id: string, id: string, name: string){
        this._id = _id;
        this.id = id;
        this.name = name;

    }
}