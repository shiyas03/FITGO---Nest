import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentData } from './payment.interface'

@Controller('payment')
export class PaymentController {

    constructor(private paymentService : PaymentService){}

    @Post('')
    async uploadPayment(@Body() details:PaymentData){
        console.log(details);
    }
}
