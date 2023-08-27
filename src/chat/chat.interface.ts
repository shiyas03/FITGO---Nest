export interface Chat{
    connection:string,
    sender:string,
    reciever:string,
    content:string;
}

export interface Messages{
    _id:string;
    connection:string,
    sender:{
        _id:string;
        name:string;
        imageUrl:string
    },
    reciever:{
        _id:string;
        name:string;
        imageUrl:string
    },
    content:string;
    timestamp:Date;
}

export interface AllChat{
    _id:string;
    connection:string,
    sender:string,
    reciever:string,
    content:string;
    timestamp:string;
    seen:boolean
}