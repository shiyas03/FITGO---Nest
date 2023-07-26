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
    id?: ObjectId,
    success: boolean
    message?:string;
}

export interface LoginReturn {
    error?:string
    token?: string,
    id?:string,
    message?:string
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
    imageUrl:string;
    isUpload?:boolean;
    joinDate?:Date
}

export interface UpdateDetails{
    name: string;
    phone: number;
    age: number;
    height: number;
    weight: number;
}