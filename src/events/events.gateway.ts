import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway({cors:true})
export class EventsGateway {
  @WebSocketServer() server:Server;

  public notificacionDetectarModificacionHorario(detectadoCambioHorario: any): void{
    this.server.emit('cambioHorarioDetectado', detectadoCambioHorario);
  }
}
