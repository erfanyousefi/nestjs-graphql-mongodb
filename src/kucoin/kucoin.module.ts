import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { KucoinController } from "./kucoin.controller";
import { KucoinResolver } from "./kucoin.resolver";
import { KucoinService } from "./kucoin.service";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
            transformResponse: [
                function (data) {
                    return JSON.parse(data)
                }
            ]
        })
    ],
    controllers: [KucoinController],
    providers: [KucoinResolver, KucoinService],
    exports: []
})
export class KucoinModule { }