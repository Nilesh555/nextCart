from django.urls import path

from .views import (
    CategoryListAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
    CartAPIView,
    AddToCartAPIView,
    UpdateCartItemAPIView,
    DeleteCartItemAPIView
)

urlpatterns = [

    path(
        "category/",
        CategoryListAPIView.as_view()
    ),

    path(
        "products/",
        ProductListAPIView.as_view()
    ),

    path(
        "products/<int:pk>/",
        ProductDetailAPIView.as_view()
    ),

    path(
        "cart/",
        CartAPIView.as_view()
    ),

    path(
        "cart/add/",
        AddToCartAPIView.as_view()
    ),

    path(
        "cart/update/<int:id>/",
        UpdateCartItemAPIView.as_view()
    ),

    path(
        "cart/delete/<int:id>/",
        DeleteCartItemAPIView.as_view()
    ),

]