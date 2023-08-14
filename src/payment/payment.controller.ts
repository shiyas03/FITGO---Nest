import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.interface';

@Controller('payment')
export class PaymentController {

    constructor(private paymentService: PaymentService) { }

    @Post('')
    async payment(@Body() data: Payment) {
        return await this.paymentService.payment(data)
    }

    @Get('status/:session_id')
    async paymentStatus(@Param('session_id') session_id: string) {
        return this.paymentService.paymentStatus(session_id)
    }

    @Get('fetch/:user_id')
    async fetchPayments(@Param('user_id') user_id: string) {
        return this.paymentService.fetchPayments(user_id)
    }

    @Get('get_all')
    async fetchAllPayments() {
        return this.paymentService.fetchAllPayments()
    }

    @Get('trainer/:trainer_id')
    async fetchTrainerPayments(@Param('trainer_id') trainer_id: string) {
        return this.paymentService.fetchTrainerPayments(trainer_id)
    }

    @Patch('pay_to_trainer')
    async  payToTrainer(@Body() data:{trainerId:string}){
        return this.paymentService.payToTrainer(data.trainerId)
    }
}

