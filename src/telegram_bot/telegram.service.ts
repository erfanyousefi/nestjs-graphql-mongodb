import { HttpService } from "@nestjs/axios";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { createReadStream, fstat, writeFileSync } from "fs";
import { TELEGRAF_MODULE_OPTIONS } from "nestjs-telegraf";
import { TelegramException, TelegramModuleOptions, TelegramResponse, TelegramService, TelegramUser } from "nestjs-telegram";
import * as path from "path";
import { catchError, map, Observable } from "rxjs";
import { botKey, chats_id, messages_id } from "src/config/confog";

@Injectable()
export class TelegramBotService{
    private url : string
    constructor(
        private http : HttpService
    ){}
    
    private async botCall(url : string, data? : any, httpOption? : AxiosRequestConfig) {
        this.url = `https://api.telegram.org/bot${botKey}/${url}`;
        console.log(data)
        console.log(this.url)
        const httpresult = this.http.post(this.url, data, httpOption).pipe(
            map(response => {
                 if(response?.data) return response.data;
                 throw new HttpException("error", 400)
            }),
            catchError((error : Error) => {
                throw new HttpException(error, 400)
            })
            )
        return httpresult
    }
    getMe(){
        return this.botCall("getMe", {});
    }
    getUpdates(){
        return this.botCall("getUpdates", {});
    }
    sendMessage(chatID?:string){
        let chat_id = String(chatID || chats_id.erfan)
        console.log(chat_id)
        return this.botCall("sendMessage", {
            chat_id, 
            text : "shaki veran ayyyyyyyyyyy",
            protect_content : true
        });
    }
    updateMessageText(messageID?:string, chatID?:string){
        let chat_id = String(chatID || chats_id.coffeeLearn);
        let message_id = Number(messageID || messages_id.testMessage);
        console.log(chat_id)
        return this.botCall("editMessageText", {
            chat_id, 
            message_id,
            text : "this is a test message with binex Bot for Update - latestTest"
        });
    }
    updateMessageMedia(fileBuffering? : any, mimtype?:string, messageID?:string, chatID?:string){
        let chat_id = String(chatID || chats_id.erfan);
        let message_id = Number(messageID || messages_id.erfanMessage);
        const type = mimtype?.includes("image") ? ".jpg" : ".zip"
        // writeFileSync(("newFile"+type), fileBuffering)
        return this.botCall("editMessageMedia", {
            chat_id, 
            message_id : 4,
            media : {
                type : "photo",
                media :  "https://avatars.githubusercontent.com/u/17201365?s=88&v=4" //"https://s0.2mdn.net/9470920/204212_AWS_Static_Banner_Refresh_ML_1A_300x600.jpg"
            }
        });
    }
    sendPhoto(fileBuffering, mimtype?:string, chatID?:string){
        let chat_id = String(chatID || chats_id.erfan);
        const type = mimtype?.includes("image") ? ".jpg" : ".jpg"
        writeFileSync(("newFile"+type), fileBuffering)
        return this.botCall("sendPhoto", {
            chat_id, 
            photo :"https://avatars.githubusercontent.com/u/75472834?v=4"// "http://localhost:3000/telegram/get-image"
        });
    }
    deleteMessage(chatdID? : string, messageID? : string){
        const chat_id = String(chatdID || chats_id.erfan);
        const message_id = Number(messageID || messages_id.erfanMessage);
        return this.botCall("deleteMessage", {chat_id, message_id})
    }
}