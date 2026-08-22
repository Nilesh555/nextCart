from django.urls import path

from .views import (

    PlaceOrderAPIView,

    OrderHistoryAPIView,

    OrderDetailAPIView,

    CancelOrderAPIView,

    UpdateOrderStatusAPIView,

)

urlpatterns = [

    path(
        "orders/",
        OrderHistoryAPIView.as_view()
    ),

    path(
        "orders/place/",
        PlaceOrderAPIView.as_view()
    ),

    path(
        "orders/<int:pk>/",
        OrderDetailAPIView.as_view()
    ),

    path(
        "orders/<int:pk>/cancel/",
        CancelOrderAPIView.as_view()
    ),

    path(
        "orders/<int:pk>/status/",
        UpdateOrderStatusAPIView.as_view()
    ),

]