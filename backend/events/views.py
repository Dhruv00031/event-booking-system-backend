from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)

from .models import Event, Booking
from .serializers import EventSerializer, BookingSerializer
from .permissions import IsAdminOrReadOnly


# ============================
# EVENT VIEWS
# ============================

class EventListView(ListAPIView):
    """
    List all events (authenticated users)
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]


class EventDetailView(RetrieveAPIView):
    """
    Retrieve a single event by ID
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]


class EventCreateView(CreateAPIView):
    """
    Create a new event (admin only)
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]


class EventUpdateView(UpdateAPIView):
    """
    Update an event (admin only)
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]


class EventDeleteView(DestroyAPIView):
    """
    Delete an event (admin only)
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]


# ============================
# BOOKING VIEWS
# ============================

class BookEventView(APIView):
    """
    Book seats for an event (authenticated users)
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        try:
            seats_requested = int(request.data.get("seats_booked"))
        except (TypeError, ValueError):
            return Response(
                {"error": "seats_booked must be a valid number"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if seats_requested <= 0:
            return Response(
                {"error": "seats_booked must be greater than zero"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            with transaction.atomic():
                event = Event.objects.select_for_update().get(id=event_id)

                if event.available_seats < seats_requested:
                    return Response(
                        {"error": "Not enough seats available"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                booking = Booking.objects.create(
                    user=request.user,
                    event=event,
                    seats_booked=seats_requested,
                )

                event.available_seats -= seats_requested
                event.save()

            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Event.DoesNotExist:
            return Response(
                {"error": "Event not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class MyBookingsView(APIView):
    """
    List bookings for the logged-in user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
