 
export interface WebParamInterface {
    user_id: string,
    session_id: string,
}

export interface MessageInterface {
    _id: string,
    content: string,
    type: 'bot' | 'human' | 'narrator',
    version: number
}