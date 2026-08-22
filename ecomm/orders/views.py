from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from .serializers import OrderSerializer

from store.models import Cart


class PlaceOrderAPIView(APIView):

    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):

        cart = get_object_or_404(
            Cart,
            user=request.user
        )

        cart_items = cart.items.all()

        if not cart_items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        total = 0

        for item in cart_items:
            total += item.product.price * item.quantity

        order = Order.objects.create(

            user=request.user,

            full_name=request.data["full_name"],

            phone=request.data["phone"],

            address=request.data["address"],

            city=request.data["city"],

            state=request.data["state"],

            pincode=request.data["pincode"],

            total_price=total

        )

        for item in cart_items:

            OrderItem.objects.create(

                order=order,

                product=item.product,

                quantity=item.quantity,

                price=item.product.price

            )

        cart_items.delete()

        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
class OrderHistoryAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        orders = Order.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)
class OrderDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        order = get_object_or_404(

            Order,

            id=pk,

            user=request.user

        )

        serializer = OrderSerializer(order)

        return Response(serializer.data)

class CancelOrderAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        order = get_object_or_404(

            Order,

            id=pk,

            user=request.user

        )

        if order.status == "Delivered":

            return Response(

                {

                    "error": "Delivered order cannot be cancelled."

                },

                status=status.HTTP_400_BAD_REQUEST

            )

        order.status = "Cancelled"

        order.save()

        return Response(

            {

                "message": "Order cancelled successfully."

            }

        )
        
from rest_framework.permissions import IsAdminUser


class UpdateOrderStatusAPIView(APIView):

    permission_classes = [IsAdminUser]

    def patch(self, request, pk):

        order = get_object_or_404(Order, id=pk)

        order.status = request.data.get("status")

        order.save()

        return Response(

            {

                "message": "Status updated."

            }

        )
