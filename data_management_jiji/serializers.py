from rest_framework import serializers
from .models import Category, Region, Product, Cart

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock_quantity']

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True, source='product')

    class Meta:
        model = Cart
        fields = ['id', 'product', 'product_id', 'quantity']

    def create(self, validated_data):
        product = validated_data.pop('product')
        cart_item, created = Cart.objects.update_or_create(
            product=product, defaults=validated_data)
        return cart_item
