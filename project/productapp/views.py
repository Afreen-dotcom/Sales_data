from rest_framework import viewsets
from .models import products
from .serializers import productSerializer
from rest_framework.response import Response
from django.db.models import Sum,Count
from django.shortcuts import render
def index(request):
    return render(request,'index.html')
class productView(viewsets.ModelViewSet):
    queryset=products.objects.all()
    serializer_class =productSerializer

class salesData(viewsets.ViewSet):
    def list(self,request):
        data = (
            products.objects.values('Category')
            .annotate(total_price=Sum('Price'))
            
        )

        
        labels = [item["Category"] for item in data]
        values = [item["total_price"] for item in data]
        chart_data = {
        "labels": labels,
            "data": values,
            }
        return Response(chart_data)
    
class CountData(viewsets.ViewSet):
    def list(self,request):
        data = (
            products.objects.values('Category')
            .annotate(total_count=Count('Title'))
            
        )

        
        labels = [item["Category"] for item in data]
        values = [item["total_count"] for item in data]
        count_data = {
        "labels": labels,
            "data": values,
            }
        return Response(count_data)