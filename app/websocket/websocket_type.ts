export interface StreamingType {
    event: string,
    session_id: string,
    data: string,
    type: 'complete' | 'chunk'
}

export const SocketEvent = Object.freeze({
    bot: 'bot',
    open: 'socket_open'
})