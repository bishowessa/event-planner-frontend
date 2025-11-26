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
    searchDate: string = '';
    searchRole: string = 'All';
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
        this.eventService.getMyOrganizedEvents().subscribe({
            next: (response: any) => {
                this.organizedEvents = response.organized_events || [];
            },
            error: (err) => console.error('Failed to load organized events', err)
        });

        this.eventService.getMyInvitedEvents().subscribe({
            next: (response: any) => {
                this.invitedEvents = response.invited_events || [];
            },
            error: (err) => console.error('Failed to load invited events', err)
        });
    }

    search(): void {
        const params: any = {};
        if (this.searchQuery.trim()) params.keyword = this.searchQuery;
        if (this.searchDate) params.date = this.searchDate;
        if (this.searchRole && this.searchRole !== 'All') params.role = this.searchRole;

        if (Object.keys(params).length === 0) {
            this.searchResults = null;
            return;
        }

        this.eventService.searchEvents(params).subscribe({
            next: (results) => this.searchResults = results,
            error: (err) => console.error('Search failed', err)
        });
    }
}
