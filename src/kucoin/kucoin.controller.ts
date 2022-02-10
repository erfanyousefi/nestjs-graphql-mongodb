import { Controller, Get } from "@nestjs/common";
import { KucoinService } from "./kucoin.service";

@Controller("/kucoin")
export class KucoinController{
    constructor(
        private kucoinService : KucoinService
    ){}
    @Get()
    list(){
        return this.kucoinService.getListOfCurrency()
    }
}