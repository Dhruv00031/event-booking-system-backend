from django.db import transaction
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Event, Booking
from .serializers import EventSerializer, BookingSerializer
from .permissions import IsAdminOrReadOnly


class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]


class BookEventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        try:
            seats_requested = int(request.data.get("seats_booked"))
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid seat number"},
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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
