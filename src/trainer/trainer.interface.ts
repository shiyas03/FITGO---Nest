export interface Trainer {
    _id: string;
    email: string;
    password: string;
}

export interface Register {
    name: string
    email: string
    password: string
}

export interface Files {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}