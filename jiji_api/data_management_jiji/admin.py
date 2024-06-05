from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Category, Region, Product, Cart

admin.site.register(Category)
admin.site.register(Region)
admin.site.register(Product)
admin.site.register(Cart)
