export interface Trainer {
  _id: string;
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  phone: number;
  password: string;
}

export interface Files {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface Profile {
  name: string;
  email: string;
  about: string;
  joinDate: Date;
}


export interface fetchTrainers {
  _id: string;
  name: string;
  experience: number
  specialized: string
  about: string;
  imageUrl: string;
  joinDate: Date;
  access:boolean
  reviews:[{
    review:string;
    userId:{
      _id:string;
      name:string;
      imageUrl:string;
    }
  }]
}

export interface Update{
  name:string
  phone:string
  about:string
}