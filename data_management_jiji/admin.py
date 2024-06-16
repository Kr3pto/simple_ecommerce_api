
# Register your models here.
from django.contrib import admin
from .models import Category, Region, Product, Cart

class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_product', 'quantity')
    search_fields = ('product__name',)
    list_filter = ('product',)
    ordering = ('-id',)
    fields = ('product', 'quantity')

    def get_product(self, obj):
        return obj.product.name
    get_product.short_description = 'Product'
    get_product.admin_order_field = 'product__name'


admin.site.register(Category)
admin.site.register(Region)
admin.site.register(Product)
admin.site.register(Cart,CartAdmin)
