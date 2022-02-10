import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  private logger: Logger = new Logger('Appgateway');
  afterInit(server: any) {
    this.logger.log('Initialized Socket ');
  }
  @SubscribeMessage('messages')
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    // client.emit("msgToclient", payload)
    return { event: 'messages', data: 'Hello world!' };
  }
}
