from django.contrib import admin
from .models import User, Event, Registration, Attendance

admin.site.register(User)
admin.site.register(Event)
admin.site.register(Registration)
admin.site.register(Attendance)