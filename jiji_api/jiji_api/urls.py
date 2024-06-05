from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('data_management_jiji/', include('data_management_jiji.urls')),
]
