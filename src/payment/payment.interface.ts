import { fetchTrainers } from "src/trainer/trainer.interface";
import { UserData } from "src/users/user.interface";

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
  amount: number;
  specialized: string
}

export interface PaymentData {
  stripeToken: StripeToken;
  trainerId: string;
  userId: string;
}

export interface Payment {
  amount: number;
  paidDate: Date;
  expiryDate: Date;
  paymentId: string;
  trainerId: string;
  userId: string;
  packageId: string;
  sessionId: string;
}


export interface PaymentDetails {
  amount: number;
  paidDate: Date;
  expiryDate: Date;
  packageId: string;
  sessionId: string;
  userId: UserData;
  trainerId: fetchTrainers;
  status: string;
}