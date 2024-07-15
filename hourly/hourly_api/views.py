from django.shortcuts import render
from rest_framework import viewsets, permissions, generics

from .models import Apartment
from .permissions import AllForAdminOtherReadOnlyPermission
from .serializer import ApartmentSerializer, CitySerializer


class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    # ordering = ['id']
    
class CityListAPIView(generics.ListAPIView):
    queryset = Apartment.objects.values('city').distinct()
    serializer_class = CitySerializer
