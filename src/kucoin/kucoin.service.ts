import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
// import kucoin from "kucoin-node-sdk/src/index.js"
import { map } from "rxjs";
import { KuCoinConfig } from "src/config/confog";
@Injectable()
export class KucoinService{
    constructor(
        private httpService : HttpService
    ){}
    async getListOfCurrency(){
        try {
            const token = "BTC"
            const url = "https://api.kucoin.com/api/v2/currencies"
            const url2 = "https://api.kucoin.com/api/v1/accounts"
            const currency = await this.httpService.get(`${url2}`, {
                headers : {
                    "API-KEY" : KuCoinConfig.apiKey
                }
            }).pipe(map(response => response.data))
            console.log(JSON.stringify(currency, null, 2))
            return currency
        } catch (error) {
            return error.message;
        }
    }
    // async authorization(){
    //     await kucoin.init(KuCoinConfig);
    //     const data = await kucoin.getAccounts()
    //     return data
        
    // }
}