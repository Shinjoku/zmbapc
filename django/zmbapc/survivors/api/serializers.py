from survivors.models import Survivor
from rest_framework import serializers

class SurvivorCreateSerializer(serializers.ModelSerializer):
    class Meta():
        model = Survivor
        fields = (
            'name',
            'age',
            'gender',
            'latitude',
            'longitude',
        )
