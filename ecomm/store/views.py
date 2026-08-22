from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Category, Product, Cart, CartItem
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CartSerializer
)

class CategoryListAPIView(APIView):

    def get(self, request):
        categories = Category.objects.all()

        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)
    
class ProductListAPIView(APIView):

    def get(self, request):

        products = Product.objects.filter(is_available=True)

        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)
    
class ProductDetailAPIView(APIView):

    def get(self, request, pk):

        product = get_object_or_404(Product, pk=pk)

        serializer = ProductSerializer(product)

        return Response(serializer.data)
class CartAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        cart, created = Cart.objects.get_or_create(
            user=request.user
        )

        serializer = CartSerializer(cart)

        return Response(serializer.data)
    
class AddToCartAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        product = get_object_or_404(Product, id=product_id)

        cart, created = Cart.objects.get_or_create(
            user=request.user
        )

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()

        return Response(
            {
                "message": "Product added successfully"
            },
            status=status.HTTP_201_CREATED
        )
        
class UpdateCartItemAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, id):

        quantity = request.data.get("quantity")

        cart = get_object_or_404(
            Cart,
            user=request.user
        )

        item = get_object_or_404(
            CartItem,
            id=id,
            cart=cart
        )

        item.quantity = quantity

        item.save()

        return Response({
            "message": "Cart updated"
        })
class DeleteCartItemAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, id):

        cart = get_object_or_404(
            Cart,
            user=request.user
        )

        item = get_object_or_404(
            CartItem,
            id=id,
            cart=cart
        )

        item.delete()

        return Response({
            "message": "Item removed"
        })
        
