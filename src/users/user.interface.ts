import { ObjectId } from "mongoose";

export interface UserDetails {
    age: number;
    height: number;
    weight: number;
    goal: string;
    goalWeight: number;
    months: number;
    gender: string;
    activity: string;
    calorieBurn: number;
    calorieNeed: number;
    id: ObjectId;
}

export interface Register {
    name: string;
    email: string;
    phone: number;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface RegisterReturn {
    emailError?: boolean;
    phoneError?: boolean;
    id?: ObjectId,
    success?: boolean
}

export interface LoginReturn {
    error?:string
    token?: string,
    id?:string
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    access:boolean
}

export interface Profile {
    _id:string;
    name: string;
    email: string;
    phone: number;
    age: number;
    height: number;
    weight: number;
    goal: string;
    goalWeight: number;
    months: number;
    gender: string;
    activity: string;
    calorieBurn: number;
    calorieNeed: number;
    imageUrl:string
}

export interface UpdateDetails{
    name: string;
    phone: number;
    age: number;
    height: number;
    weight: number;
}