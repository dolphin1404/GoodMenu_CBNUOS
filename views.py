# views.py

from django.shortcuts import render
from .models import Store

def add_store(request):
    if request.method == "POST":
        name = request.POST.get('name')
        category = request.POST.get('category')
        category_1 = request.POST.get('category_1')
        latitude = request.POST.get('latitude')
        longitude = request.POST.get('longitude')

        Store.objects.create(
            name=name,
            category=category,
            category_1=category_1,
            latitude=latitude,
            longitude=longitude,
        )

    return render(request, 'add_store.html')
