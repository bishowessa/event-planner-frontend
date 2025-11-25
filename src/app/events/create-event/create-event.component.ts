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

    constructor(private eventService: EventService, private router: Router) { }

    onSubmit(): void {
        this.eventService.createEvent(this.event).subscribe({
            next: () => {
                this.router.navigate(['/app/dashboard']);
            },
            error: (err) => console.error('Failed to create event', err)
        });
    }
}
