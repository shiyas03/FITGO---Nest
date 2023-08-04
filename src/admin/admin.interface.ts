export interface Admin {
    _id: string;
    email: string;
    password: string;
}

export interface Users{
    _id: string;
    name: string;
    email: string;
    access:boolean;
    imageUrl:string;
}

export interface Trainers{
    _id:string;
    name:string;
    email:string;
    about:string;
    cv:string;
    certificate:string[];
    access:boolean;
    approve:boolean;
}