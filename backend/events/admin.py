from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "date",
        "location",
        "total_seats",
        "available_seats",
    )
    list_filter = ("date", "location")
    readonly_fields = ("available_seats",)
