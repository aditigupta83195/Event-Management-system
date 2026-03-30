import qrcode
import json
import os
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Event, Registration, Attendance


@csrf_exempt
def register_event(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    if not request.body:
        return JsonResponse({"error": "Empty request body"}, status=400)

    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if 'user_id' not in data or 'event_id' not in data:
        return JsonResponse({"error": "Missing fields"}, status=400)
    
    
    try:
        user = User.objects.get(id=data['user_id'])
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    try:
        event = Event.objects.get(id=data['event_id'])
    except Event.DoesNotExist:
        return JsonResponse({"error": "Event not found"}, status=404)

    if Registration.objects.filter(event=event).count() >= event.capacity:
        return JsonResponse({"error": "Event is full"}, status=400)

    if Registration.objects.filter(user=user, event=event).exists():
        return JsonResponse({"error": "Already registered"}, status=400)

    reg = Registration.objects.create(user=user, event=event)

    # ✅ Dynamic URL (important)
    base_url = request.build_absolute_uri('/')[:-1]
    qr_data = f"{base_url}/checkin/{reg.id}/"

    os.makedirs("media/qr_codes", exist_ok=True)
    file_path = f"media/qr_codes/reg_{reg.id}.png"

    img = qrcode.make(qr_data)
    img.save(file_path)

    reg.qr_code = f"qr_codes/reg_{reg.id}.png"
    reg.save()

    return JsonResponse({
        "message": "Registered successfully",
        "qr": request.build_absolute_uri(reg.qr_code.url),
        "link": qr_data,
        "reg_id": f"REG-{reg.id}"
    })


@csrf_exempt
def check_in(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    if not request.body:
        return JsonResponse({"error": "Empty request body"}, status=400)

    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if 'reg_id' not in data:
        return JsonResponse({"error": "Missing reg_id"}, status=400)

    try:
        reg_id = data['reg_id'].replace("REG-", "")
        reg = Registration.objects.get(id=reg_id)
    except:
        return JsonResponse({"error": "Invalid registration ID"}, status=404)

    if hasattr(reg, 'attendance'):
        return JsonResponse({"message": "Already checked in"})

    Attendance.objects.create(registration=reg)

    return JsonResponse({"message": "Check-in successful"})


def check_in_qr(request, reg_id):
    try:
        reg = Registration.objects.get(id=reg_id)
    except:
        return HttpResponse("<h2>❌ Invalid QR</h2>")

    if hasattr(reg, 'attendance'):
        return HttpResponse("<h2 style='color:orange'>⚠️ Already Checked In</h2>")

    Attendance.objects.create(registration=reg)

    return HttpResponse("<h2 style='color:green'>✅ Check-in Successful</h2>")


def get_users(request):
    users = User.objects.all().values('id', 'name')
    return JsonResponse(list(users), safe=False)


def get_events(request):
    events = Event.objects.all()
    data = []

    for event in events:
        count = Registration.objects.filter(event=event).count()

        # ✅ Auto status update
        if count >= event.capacity:
            status = "Full"
        elif count > 0:
            status = "Ongoing"
        else:
            status = "Available"

        data.append({
            "id": event.id,
            "title": event.title,
            "capacity": event.capacity,
            "count": count,
            "status": status
        })

    return JsonResponse(data, safe=False)