from rest_framework import serializers

from .models import Apartment,CustomUser


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = '__all__'
        

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ['city']

class ApartmentSearchSerializer(serializers.Serializer):
    destination = serializers.CharField()
    checkInDate = serializers.DateField()
    checkOutDate = serializers.DateField()
    adults = serializers.IntegerField()
    children = serializers.IntegerField()
    petsAllowed = serializers.BooleanField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'