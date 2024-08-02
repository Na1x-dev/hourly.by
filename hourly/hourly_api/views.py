from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from .models import Apartment
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
            city = serializer.data.get('destination')
            queryset = Apartment.objects.filter(city=city)
            return Response(self.get_serializer(queryset, many=True).data)
        
        else:
            city = serializer.data.get('destination')
            queryset = Apartment.objects.filter(city=city)
            print(queryset)
            return Response(self.get_serializer(queryset, many=True).data)
            # return Response(serializer.errors, status=400)
        
        
        
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

            refresh = RefreshToken.for_user(user) # Создание Refesh и Access

            refresh.payload.update({    # Полезная информация в самом токене

                'user_id': user.id,

                'email': user.email

            })

            return Response({

                'refresh': str(refresh),

                'access': str(refresh.access_token), # Отправка на клиент

            }, status=status.HTTP_201_CREATED)
            


class RegisterView(generics.CreateAPIView):
    serializer_class = CustomUserCreateSerializer
