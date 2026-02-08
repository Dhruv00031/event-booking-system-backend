from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    location = models.CharField(max_length=255)
    total_seats = models.PositiveIntegerField()
    available_seats = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # set available seats on first creation
        if not self.pk:
            self.available_seats = self.total_seats
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Booking(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="bookings"
    )
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="bookings"
    )
    seats_booked = models.PositiveIntegerField()
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} → {self.event} ({self.seats_booked})"
