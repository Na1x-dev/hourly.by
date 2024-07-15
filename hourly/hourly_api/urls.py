from django.urls import include, path
from rest_framework import routers

from .views import ApartmentViewSet, CityListAPIView

router = routers.DefaultRouter()
router.register('apartment', ApartmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get_cities', CityListAPIView.as_view(), name='city-list')
    # path('auth/', include('rest_framework.urls')),
]
