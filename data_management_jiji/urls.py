from django.urls import path
from .views import ProductList, ProductDetail, CartList, CartDetail, ProductStock

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, RegionViewSet, ProductViewSet, CartViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'regions', RegionViewSet)
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('products', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>', ProductDetail.as_view(), name='product-detail'),
    path('cart', CartList.as_view(), name='cart-list'),
    path('cart/<int:pk>', CartDetail.as_view(), name='cart-detail'),
    path('stock/<int:pk>', ProductStock.as_view(), name='product-stock'),
]
