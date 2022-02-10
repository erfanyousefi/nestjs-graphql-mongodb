import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import {TelegramModule} from "nestjs-telegram"
import { TelegramController } from "./telegram.controller";
import { TelegramBotService } from "./telegram.service";

@Module({
    imports : [
        HttpModule.register({
            maxRedirects : 5,
            timeout : 50000,
            transformResponse :  [
                function (data) {
                    return JSON.parse(data)
                }
            ]
        })
    
    ],
    controllers : [TelegramController],
    providers : [TelegramBotService],
    exports : []
})
export class TelegramBotModule{}