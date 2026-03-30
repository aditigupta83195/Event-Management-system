from django.urls import path
from .views import register_event, check_in, check_in_qr, get_users, get_events
urlpatterns = [
    path('register/', register_event),
    path('checkin/', check_in),                 # manual
    path('checkin/<int:reg_id>/', check_in_qr), # QR/link
    path('users/', get_users),
    path('events/', get_events),
]