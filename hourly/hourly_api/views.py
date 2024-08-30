from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view

from .models import Apartment, CustomUser, Booking
# from .permissions import AllForAdminOtherReadOnlyPermission
from .serializer import ApartmentSerializer, CitySerializer, ApartmentSearchSerializer, CustomUserSerializer, CustomUserCreateSerializer

class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    # ordering = ['id']


class ApartmentSearchView(generics.ListAPIView):
    serializer_class = ApartmentSerializer
    queryset = []

    def post(self, request):
        serializer = ApartmentSearchSerializer(data=request.data)
        
        if serializer.is_valid():
            print(request.data)
            city = serializer.data.get('destination')
            start_date = serializer.data.get('checkInDate')
            end_date = serializer.data.get('checkOutDate')
            queryset = Apartment.objects.filter(city=city)
            available_apartments = [apartment for apartment in queryset if apartment.is_available(start_date, end_date)]            
            return Response(self.get_serializer(available_apartments, many=True).data)
            
        else:
            return Response(serializer.errors, status=400)
        
        # if serializer.is_valid():
            # Выполните здесь необходимую обработку данных
        #     # check_in_date = serializer.validated_data.get('checkInDate')
        #     # Обработка данных и возврат результата
        #     return Response({"message": "Data received successfully"})
        # else:
        #     return Response(serializer.errors, status=400)

            
class CityListAPIView(generics.ListAPIView):
    queryset = Apartment.objects.values('city').distinct()
    serializer_class = CitySerializer


class RegistrationAPIView(APIView):

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)  # Создание Refesh и Access
            refresh.payload.update({  # Полезная информация в самом токене
                'user_id': user.id,
                'email': user.email
            })

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),  # Отправка на клиент
            }, status=status.HTTP_201_CREATED)


class RegisterView(generics.CreateAPIView):
    serializer_class = CustomUserCreateSerializer


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            user_data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'patronymic': user.patronymic,
            }
            return Response(user_data)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    
class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        apartment_id = request.data.get('apartment_id')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        try:
            apartment = Apartment.objects.get(id=apartment_id)
        except Apartment.DoesNotExist:
            Response({'error':'Apartment not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not apartment.is_available(start_date, end_date):
            return Response({'error':'Apartment is not available for the selected dates'}, status=status.HTTP_400_BAD_REQUEST)
        
        booking = Booking.objects.create(
            apartment_id=apartment.id,
            start_date=start_date,
            end_date=end_date,
            user_id=request.user.id,
        )
        
        return Response({'id': booking.id}, status=status.HTTP_201_CREATED)
