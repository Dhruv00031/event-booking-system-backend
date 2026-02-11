from django.urls import path
from .views import (
    EventListCreateView,
    EventDetailView,
    BookEventView,
    MyBookingsView,
)

urlpatterns = [
    path("events/", EventListCreateView.as_view()),
    path("events/<int:pk>/", EventDetailView.as_view()),
    path("events/<int:event_id>/book/", BookEventView.as_view()),
    path("my-bookings/", MyBookingsView.as_view()),
]
