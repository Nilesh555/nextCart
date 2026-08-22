from rest_framework import serializers
from .models import Category, Product, Cart, CartItem


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"
        
        
class ProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = "__all__"

  
class CartItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product",
            "quantity",
            "total_price",
        ]
        
class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "items",
            "created_at",
        ]