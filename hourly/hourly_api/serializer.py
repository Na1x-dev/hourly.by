from rest_framework import serializers

from .models import Apartment


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ['city']
       