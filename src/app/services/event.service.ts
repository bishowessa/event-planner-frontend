import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Event } from '../models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    createEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.apiUrl}/events/`, event, { headers: this.getHeaders() });
    }

    getMyOrganizedEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/events/organized`, { headers: this.getHeaders() });
    }

    getMyInvitedEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/events/invited`, { headers: this.getHeaders() });
    }

    getEvent(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/events/${id}`, { headers: this.getHeaders() });
    }

    deleteEvent(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/events/${id}`, { headers: this.getHeaders() });
    }

    inviteUser(eventId: string, userId: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/events/${eventId}/invite`, { invitee_id: userId }, { headers: this.getHeaders() });
    }

    respondToEvent(eventId: string, status: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/events/${eventId}/rsvp`, { status }, { headers: this.getHeaders() });
    }

    searchEvents(params: { keyword?: string, date?: string, role?: string }): Observable<Event[]> {
        let queryParams: any = {};
        if (params.keyword) queryParams['q'] = params.keyword;
        if (params.date) queryParams['date'] = params.date;
        if (params.role && params.role !== 'All') queryParams['role'] = params.role;

        return this.http.get<Event[]>(`${this.apiUrl}/events/search`, { headers: this.getHeaders(), params: queryParams });
    }
}
