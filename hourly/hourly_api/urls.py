from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ApartmentViewSet, CityListAPIView, ApartmentSearchView, RegisterView, UserProfileAPIView, BookingView

router = routers.DefaultRouter()
router.register('apartment', ApartmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get_cities', CityListAPIView.as_view(), name='city-list'),
    path('search', ApartmentSearchView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('users/<int:user_id>/', UserProfileAPIView.as_view(), name='user-profile'),
    path('bookings/', BookingView.as_view(), name='bookings'),
]
