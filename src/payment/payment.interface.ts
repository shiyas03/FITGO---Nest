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
    specialized:string
  }
  
 export interface PaymentData {
    stripeToken: StripeToken;
    trainerId: string;
    userId: string;
  }
  
  export class Payment {
    amount: number;
    paidDate: Date;
    expiryDate: Date;
    paymentId: string;
    trainerId: string;
    userId:string;
    packageId:string;
    sessionId:string;
  }
