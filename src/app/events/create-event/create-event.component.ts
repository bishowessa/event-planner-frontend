import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
    selector: 'app-create-event',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
    event: Event = {
        title: '',
        description: '',
        date: '',
        time: '',
        location: ''
    };
    errorMessage: string | null = null;

    constructor(private eventService: EventService, private router: Router) { }

    onSubmit(): void {
        this.errorMessage = null;

        // Basic validation
        if (!this.event.date || !this.event.time) {
            this.errorMessage = 'Date and Time are required.';
            return;
        }

        // Create payload with ISO date
        const payload = {
            ...this.event,
            date: new Date(this.event.date).toISOString()
        };

        this.eventService.createEvent(payload).subscribe({
            next: () => {
                this.router.navigate(['/app/dashboard']);
            },
            error: (err) => {
                console.error('Failed to create event', err);
                this.errorMessage = err.error?.error || 'Failed to create event. Please try again.';
            }
        });
    }
}
