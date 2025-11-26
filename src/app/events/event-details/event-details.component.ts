import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event.model';

@Component({
    selector: 'app-event-details',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
    event: Event | null = null;
    isOrganizer: boolean = false;
    inviteUserId: number | null = null;
    userId: string | null = null;

    attendees: any[] = [];
    isAttendee: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.userId = this.authService.getUserId();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadEvent(id);
        }
    }

    loadEvent(id: string): void {
        this.eventService.getEvent(id).subscribe({
            next: (response: any) => {
                this.event = response.event;
                this.attendees = response.participants || [];
                this.isOrganizer = (response.userRole === 'organizer');
                this.isAttendee = (response.userRole === 'attendee');
            },
            error: (err) => console.error('Failed to load event', err)
        });
    }

    deleteEvent(): void {
        if (!this.event?.id) return;
        if (confirm('Are you sure you want to delete this event?')) {
            this.eventService.deleteEvent(this.event.id).subscribe({
                next: () => this.router.navigate(['/app/dashboard']),
                error: (err) => console.error('Failed to delete event', err)
            });
        }
    }

    invite(): void {
        if (!this.event?.id || !this.inviteUserId) return;
        this.eventService.inviteUser(this.event.id, this.inviteUserId).subscribe({
            next: () => {
                alert('Invitation sent!');
                this.inviteUserId = null;
            },
            error: (err) => console.error('Failed to invite user', err)
        });
    }

    respond(status: string): void {
        if (!this.event?.id) return;
        this.eventService.respondToEvent(this.event.id, status).subscribe({
            next: () => alert('Response updated!'),
            error: (err) => console.error('Failed to respond', err)
        });
    }
}
