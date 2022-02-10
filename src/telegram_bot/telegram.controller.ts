import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response, response } from "express";
import * as path from "path";
import { TelegramBotService } from "./telegram.service";

@Controller("telegram")
export class TelegramController{
    constructor(
        private telegramService : TelegramBotService
    ){}
    @Get("/get-me")
    getName(){
        return this.telegramService.getMe()
    }
    @Get("/get-updates")
    getUpdate(){
        return this.telegramService.getUpdates()
    }
    @Get("/send-message")
    sendMessage(){
        return this.telegramService.sendMessage()
    }
    @Get("/update-message-text")
    updateMessageText(){
        return this.telegramService.updateMessageText()
    }
    @Post("/update-message-media")
    @UseInterceptors(FileInterceptor("media"))
    async updateMessageMedia(@UploadedFile() file : Express.Multer.File){
        const buffer = file.buffer
        //buffer, file.mimetype
        return this.telegramService.updateMessageMedia()
    }
    @Post("/send-photo")
    @UseInterceptors(FileInterceptor("photo"))
    async sendPhoto(@UploadedFile() file : Express.Multer.File){
        const buffer = file.buffer;
        return this.telegramService.sendPhoto(buffer)
    }
    @Get("/delete-message")
    async deleteMessage(){
        return this.telegramService.deleteMessage()
    }
    @Get("/get-image")
    getImage(@Res() res: Response){
        console.log(path.join(process.cwd(), "newFile.jpg"))
        res.sendFile(path.join(process.cwd(), "newFile.jpg"))
    }
}