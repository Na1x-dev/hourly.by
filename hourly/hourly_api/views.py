from django.shortcuts import render
from rest_framework import viewsets, permissions

from .models import Apartment
from .permissions import AllForAdminOtherReadOnlyPermission
from .serializer import ApartmentSerializer


class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    # ordering = ['id']
