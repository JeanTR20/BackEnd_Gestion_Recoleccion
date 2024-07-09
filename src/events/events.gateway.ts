import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors:true})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server:Server;

  private userSockets:Map<number, string> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Cliente conectado: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    
    this.userSockets.forEach((value, key) => {
      if(value === client.id){
        this.userSockets.delete(key);
        console.log(`Client disconectado y removido: ${client.id}`)
      }
    })
  }

  @SubscribeMessage('registerUsuario')
  handleRegisterUser(@ConnectedSocket() client:Socket, @MessageBody() payload: {userId:number}){
    this.userSockets.set(payload.userId, client.id)
    console.log(`Usuario ${payload.userId} registrado con socket ${client.id}`);
  }

  public isUserConnected(userId: number): boolean {
    return this.userSockets.has(userId);
  }
  
  @SubscribeMessage('checkUserConnection')
  handleCheckUserConnection(@ConnectedSocket() client: Socket, payload: { userId: number }) {
    const isConnected = this.isUserConnected(payload.userId);
    const message = isConnected ? `Usuario ${payload.userId} está conectado.` : `Usuario ${payload.userId} no está conectado.`;
    console.log(message);
    client.emit('userConnectionStatus', { userId: payload.userId, isConnected });
  }

  public notificacionDetectarModificacionHorario(detectadoCambioHorario: any): void{
    this.server.emit('cambioHorarioDetectado', detectadoCambioHorario, (resp) => {
      console.log(`Confirmación recibida de ${resp.clientId}`);
    });
    
  }

  public notificacionDetectarEstadoCulminadoReporte(detectadoEstadoReporte: any, userId):void{
    this.emitEventToUser('detectadoEstadoCulminadoReporte', detectadoEstadoReporte, userId);
  }

  private emitEventToUser(eventName: string, data: any, userId: number){
    const socketId = this.userSockets.get(userId);
    if(socketId){
      this.server.to(socketId).emit(eventName, data);
      console.log(`Event ${eventName} enviado al usuario ${userId}`);
    } else{
      console.log(`No se encontró conexión para el usuario ${userId}`)
    }
    
  }

  // public notificacionDetectarRegistroIncidencia(detectadoRegistroIncidencia: any):void{
  //   this.server.emit('detectadoReporteIncidencia', detectadoRegistroIncidencia);
  // }
}
