from django.urls import include, path
from rest_framework import routers

from .views import ApartmentViewSet

router = routers.DefaultRouter()
router.register('apartment', ApartmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('auth/', include('rest_framework.urls')),
]
