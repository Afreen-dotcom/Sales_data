from rest_framework import routers
from .views import *
from django.urls import path,include

router=routers.DefaultRouter()
router.register(r'sales',productView)
router.register(r'data',salesData,basename='salesD')
router.register(r'count',CountData,basename='salesc')
urlpatterns=[
    path('',include(router.urls)),
    
    path('api-auth/', include('rest_framework.urls'))
]