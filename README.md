# Events Management App Schema Design

## User Story

As an event organizer, I want to create and manage events through a web platform. I should be able to:

Register and log in to the platform (I should get a welcome mail when I register).
Create new events with details such as name, date, location, description.
Manage attendees by adding, editing and removing attendees from the event (attendees should get a mail when they are added to or removed from an event).
Generate reports for each event with information about attendee count etc.

As an admin, I want to be able to approve or reject events created  by users. If an event is rejected, the admin should provide a reason for the rejection, which will be sent to the user via email. I should be able to:

i. Log in to the platform.

ii. Approve or reject events.

iii. Delete events that are no longer needed.

iv. View a list of all the registered attendees for each event.

## Requirements Analysis

### Entities:

-   Organiser: An organiser should have a name, email and a password.
-   Events: Events should be created with a registered organiser and it contains name,date,location and description of event.
-   Attendee: An attendee has a unique identifier, full-name, email, cityLocation, eventId and eventName.
-   Report: This should contain attendeecount for each event.


## API Endpoints

```
-   GET /events - Get a list of all events available to attend.
-   POST /events - For creating events available to attend
-   PUT /events/:id - For updating events already created by an organiser
-   DELETE /events/:id - For deleting an event no longer needed upon rejection by the admin.
-   POST /organisers - To register/create an organiser.
-   GET /organisers/me - To get details about a specific organiser.
-   POST /login - To verify/login an organiser.
-   POST /attendees - To create attendees for various events.
-   GET /attendees - To get all attendees for various events.
-   GET /events/reports - To get reports of an event with attendee count.
-   PATCH /admin/approve/:id - An admin route for approving an event created by an organiser
-   PATCH /admin/reject/:id - An admin route for rejecting an event created by an organiser
-   GET /retrieveEventsAttendees/:eventId - To get the list of registered attendees for each event

```
