interface IAddress {
    email: string;
    name: string;
}
export interface IMessage {
    // destinatario
    to: IAddress;
    // remetente 
    from: IAddress;
    // assunto 
    subject: string;
    // corpo da messagem 
    body: string;

}
export interface IMailProvider {
    sendMail(message: IMessage): Promise<void>
}