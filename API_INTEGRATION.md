# API Integration

This document describes how the FixItNow frontend communicates with the backend API.

## API Configuration

The frontend communicates with the FixItNow backend through the configured API base URL.

Protected API requests include the authenticated user's access token.

## Authentication

### Register
- Endpoint: `POST /auth/register`
- Frontend usage: Registration page
- Purpose: Creates a new customer or technician account.

### Login
- Endpoint: `POST /auth/login`
- Frontend usage: Login page
- Purpose: Authenticates the user and starts the authenticated session.

### Current User
- Endpoint: `GET /auth/me`
- Frontend usage: Authenticated areas
- Purpose: Retrieves the currently authenticated user's information.

## Services

### Get Services
- Endpoint: `GET /services`
- Frontend usage: Services browsing page
- Purpose: Retrieves available services for customers to browse and filter.

## Bookings

### Create Booking
- Endpoint: `POST /bookings`
- Frontend usage: Service booking page
- Purpose: Creates a booking for a selected service, date, time, and address.

### Get Bookings
- Endpoint: `GET /bookings`
- Frontend usage: Customer and technician dashboards
- Purpose: Retrieves bookings relevant to the authenticated user.

### Get Booking Details
- Endpoint: `GET /bookings/:id`
- Frontend usage: Booking details page
- Purpose: Retrieves details of a specific booking.

### Get Booked Time Slots
- Endpoint: `GET /bookings/technician/:technicianId/slots`
- Frontend usage: Booking page
- Purpose: Retrieves already booked time slots so unavailable times cannot be selected.

### Cancel Booking
- Endpoint: `PATCH /bookings/:id/cancel`
- Frontend usage: Customer dashboard
- Purpose: Allows customers to cancel an eligible booking.

### Update Booking Status
- Endpoint: `PATCH /bookings/:id/status`
- Frontend usage: Technician dashboard
- Purpose: Allows technicians to accept, decline, start, or complete bookings.

## Technician

### Get Technician Profile
- Endpoint: `GET /technicians/me/profile`
- Frontend usage: Technician profile/dashboard
- Purpose: Retrieves the authenticated technician's profile.

### Update Technician Profile
- Endpoint: `PUT /technicians/me/profile`
- Frontend usage: Technician profile
- Purpose: Updates technician profile information.

### Update Availability
- Endpoint: `PUT /technicians/me/availability`
- Frontend usage: Technician availability page
- Purpose: Updates the technician's available working schedule.

## Payments

### Create Payment
- Endpoint: `POST /payments/create`
- Frontend usage: Customer payment page
- Purpose: Creates a real payment checkout session for an accepted booking.

### Get Payments
- Endpoint: `GET /payments`
- Frontend usage: Customer payment/history section
- Purpose: Retrieves payment records.

The payment flow redirects the customer to the real payment gateway and then returns them to the frontend success or cancelled page.

## Reviews

### Create Review
- Endpoint: `POST /reviews`
- Frontend usage: Customer review section
- Purpose: Allows customers to submit a review for a completed booking.

### Get Technician Reviews
- Endpoint: `GET /reviews/technician/:technicianId`
- Frontend usage: Technician profile
- Purpose: Retrieves reviews for a technician.

## Admin

### Get Users
- Endpoint: `GET /admin/users`
- Frontend usage: Admin user management
- Purpose: Retrieves users for administration.

### Update User Status
- Endpoint: `PATCH /admin/users/:id`
- Frontend usage: Admin user management
- Purpose: Allows the admin to ban or unban users.

### Get Admin Bookings
- Endpoint: `GET /admin/bookings`
- Frontend usage: Admin dashboard
- Purpose: Retrieves booking information for administration.

### Get Categories
- Endpoint: `GET /admin/categories`
- Frontend usage: Admin category management
- Purpose: Retrieves service categories.

### Create Category
- Endpoint: `POST /admin/categories`
- Frontend usage: Admin category management
- Purpose: Creates a new service category.

## Data Fetching and State


Examples include:
- `useServices`
- `useBookings`
- `useBookingById`
- `useBookedSlots`
- `usePayments`
- `useTechnicianReviews`
- `useAdminUsers`
- `useAdminBookings`
- `useAdminCategories`

Mutations invalidate relevant queries after successful updates so that the frontend displays fresh data.

## Error Handling

API errors are handled using user-friendly UI feedback instead of exposing raw backend errors.

Examples include:
- Error messages when API requests fail
- Loading states while data is being fetched
- Empty states when no data is available
- Feedback after successful booking, status, review, or profile updates

## Frontend-to-Backend Mapping

| Frontend Feature | Backend Endpoint |
|---|---|
| Registration | `POST /auth/register` |
| Login | `POST /auth/login` |
| Current User | `GET /auth/me` |
| Services | `GET /services` |
| Create Booking | `POST /bookings` |
| Booking History | `GET /bookings` |
| Booking Details | `GET /bookings/:id` |
| Booked Slots | `GET /bookings/technician/:technicianId/slots` |
| Cancel Booking | `PATCH /bookings/:id/cancel` |
| Booking Status | `PATCH /bookings/:id/status` |
| Technician Profile | `GET /technicians/me/profile` |
| Update Profile | `PUT /technicians/me/profile` |
| Availability | `PUT /technicians/me/availability` |
| Create Payment | `POST /payments/create` |
| Payment History | `GET /payments` |
| Create Review | `POST /reviews` |
| Technician Reviews | `GET /reviews/technician/:technicianId` |
| Admin Users | `GET /admin/users` |
| Ban/Unban User | `PATCH /admin/users/:id` |
| Admin Bookings | `GET /admin/bookings` |
| Admin Categories | `GET /admin/categories` |
| Create Category | `POST /admin/categories` |