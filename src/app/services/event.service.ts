import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Event } from '../models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    createEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.apiUrl}/events`, event, { headers: this.getHeaders() });
    }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/events`, { headers: this.getHeaders() });
    }

    getEvent(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/events/${id}`, { headers: this.getHeaders() });
    }

    deleteEvent(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/events/${id}`, { headers: this.getHeaders() });
    }

    inviteUser(eventId: string, email: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/events/${eventId}/invite`, { email }, { headers: this.getHeaders() });
    }

    respondToEvent(eventId: string, status: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/events/${eventId}/respond`, { status }, { headers: this.getHeaders() });
    }

    searchEvents(params: any): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/search`, { headers: this.getHeaders(), params });
    }
}
