import { Workout } from "src/workouts/workouts.interface";

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
    id: string;
}

export interface Register {
    name: string;
    email: string;
    phone: number;
    password: string;
}

export interface Login {
    loginEmail: string;
    loginPassword: string;
}

export interface RegisterReturn {
    success: boolean
    message?:string;
}

export interface LoginReturn {
    error?:string
    token?: string,
    message?:string
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    access:boolean
    imageUrl: string;
}

interface works {
    _id: string
    workouts: Workout;
    date: Date
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
    workouts:works[]
}

export interface UpdateDetails{
    name: string;
    phone: number;
    age: number;
    height: number;
    weight: number;
}

interface StripeToken {
    id: string;
    object: string;
    card: {
      id: string;
      object: string;
      exp_month: number;
      exp_year: number;
      funding: string;
      last4: string;
      name: string;
    };
    client_ip: string;
    created: number;
    email: string;
    livemode: boolean;
    type: string;
    used: boolean;
    amount:number;
  }
  
 export interface PaymentData {
    stripeToken: StripeToken;
    trainerId: string;
    userId: string;
    
  }
  
  export class Payment {
    amount: number;
    paidDate: Date;
    secretKey: string;
    trainerId: string;
  }

  export interface contact{
    fname:string;
    sname:string;
    email:string;
    message:string;
}