export interface Event {
    id?: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    organizerId?: string;
}

export interface EventResponse {
    eventId: string;
    userId: string;
    status: 'Going' | 'Maybe' | 'Not Going';
}
