from django.db import models

class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('student', 'Student'),
        ('volunteer', 'Volunteer')
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

class Event(models.Model):
    title = models.CharField(max_length=100)
    capacity = models.IntegerField(default=100)
    status = models.CharField(max_length=20, default="upcoming")

    def __str__(self):
        return self.title

class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True)

class Attendance(models.Model):
    registration = models.OneToOneField(Registration, on_delete=models.CASCADE)
    check_in_time = models.DateTimeField(auto_now_add=True)