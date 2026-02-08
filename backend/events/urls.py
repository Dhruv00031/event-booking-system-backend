from django.urls import path
from .views import (
    EventListView,
    EventDetailView,
    EventCreateView,
    EventUpdateView,
    EventDeleteView,
    BookEventView,
    MyBookingsView,
)

urlpatterns = [
    path("events/", EventListView.as_view()),
    path("events/<int:pk>/", EventDetailView.as_view()),
    path("events/create/", EventCreateView.as_view()),
    path("events/<int:pk>/update/", EventUpdateView.as_view()),
    path("events/<int:pk>/delete/", EventDeleteView.as_view()),
    path("events/<int:event_id>/book/", BookEventView.as_view()),
    path("my-bookings/", MyBookingsView.as_view()),
]
