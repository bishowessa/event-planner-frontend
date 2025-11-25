import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { Event } from '../models/event.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    organizedEvents: Event[] = [];
    invitedEvents: Event[] = [];
    searchQuery: string = '';
    searchResults: Event[] | null = null;
    userId: string | null = null;

    constructor(private eventService: EventService, public authService: AuthService) { }

    ngOnInit(): void {
        this.userId = this.authService.getUserId();
        if (this.authService.isLoggedIn()) {
            this.loadEvents();
        } else {
            // Guest mode: only search is available
            this.organizedEvents = [];
            this.invitedEvents = [];
        }
    }

    loadEvents(): void {
        this.eventService.getEvents().subscribe({
            next: (events) => {
                if (this.userId) {
                    this.organizedEvents = events.filter(e => e.organizerId === this.userId);
                    this.invitedEvents = events.filter(e => e.organizerId !== this.userId);
                } else {
                    this.organizedEvents = events;
                }
            },
            error: (err) => console.error('Failed to load events', err)
        });
    }

    search(): void {
        if (!this.searchQuery.trim()) {
            this.searchResults = null;
            return;
        }
        this.eventService.searchEvents({ q: this.searchQuery }).subscribe({
            next: (results) => this.searchResults = results,
            error: (err) => console.error('Search failed', err)
        });
    }
}
