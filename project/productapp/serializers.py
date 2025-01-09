from rest_framework import serializers
from .models import products

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model=products
        fields='__all__'

       
    