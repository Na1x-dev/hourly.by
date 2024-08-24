from rest_framework import serializers

from .models import Apartment,CustomUser, Booking


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
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    adults = serializers.IntegerField()
    children = serializers.IntegerField()
    petsAllowed = serializers.BooleanField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'



class CustomUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name', 'patronymic', 'password')
        extra_kwargs = {
            'password': {'write_only': True}  # Пароль будет только для записи
        }

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])  # Хешируем пароль
        user.save()
        
        return user
        
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id','start_date', 'end_date', 'apartment_id', 'user_id']
        read_only_fields = ['user_id']
        
    def validate(self, data):
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError('End date must be later than start date')
        return data
    
    def create(self, validated_data):
        return super().create(validated_data)
    