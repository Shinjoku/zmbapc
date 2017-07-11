from survivors.models import Survivor
from rest_framework import serializers


class SurvivorCreateSerializer(serializers.ModelSerializer):
    """
        Create one survivor;
        On creation, "reports" and "infected" have default values, so they
        don't have to be written.
    """
    class Meta():
        model = Survivor
        fields = (
            'name',
            'age',
            'gender',
            'latitude',
            'longitude',
        )


class SurvivorListSerializer(serializers.ModelSerializer):
    """
        List all the survivors;
        On listing, all fields must be present.
    """
    class Meta():
        model = Survivor
        fields = (
            'id',
            'name',
            'age',
            'gender',
            'latitude',
            'longitude',
            'reports',
            'infected'
        )


class SurvivorUpdateSerializer(serializers.ModelSerializer):
    """
        Modify the values of one survivor;
        Only the fields "latitude" and "longitude" can be updated.
    """
    class Meta():
        model = Survivor
        fields = (
            'latitude',
            'longitude'
        )


class SurvivorDetailSerializer(serializers.ModelSerializer):
    """
        Show the informations of one survivor;
        All fields must be present.
    """
    class Meta():
        model = Survivor
        fields = (
            'id',
            'name',
            'age',
            'gender',
            'latitude',
            'longitude',
            'reports',
            'infected'
        )


class SurvivorReportSerializer(serializers.ModelSerializer):
    """
        Report one survivor as infected;
        Only survivors with more than 3 reports will be set as "infected".
    """
    class Meta():
        model = Survivor
        fields = ('reports',)
        
    def update(self, instance, validated_data):
        
        instance.reports = instance.reports + 1
        
        if(instance.reports > 2):
            instance.infected = True
        
        instance.save()
        
        return instance
