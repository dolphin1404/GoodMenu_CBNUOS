# urls.py

from django.urls import path
from .views import add_store

urlpatterns = [
    path('add_store/', add_store, name='add_store'),
]
