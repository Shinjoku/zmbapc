# Imports-------------------------------
from .serializers import (
    SurvivorCreateSerializer,
    SurvivorDetailSerializer,
    SurvivorListSerializer,
    SurvivorUpdateSerializer,
    SurvivorReportSerializer,
)
from survivors.models import Survivor

from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveDestroyAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
# --------------------------------------

class SurvivorCreateAPIView(CreateAPIView):
    """ GET """
    queryset = Survivor.objects.all()
    serializer_class = SurvivorCreateSerializer
    
    
class SurvivorListAPIView(ListAPIView):
    """ GET """
    queryset = Survivor.objects.all()
    serializer_class = SurvivorListSerializer


class SurvivorUpdateAPIView(UpdateAPIView):
    """ PUT """
    queryset = Survivor.objects.all()
    serializer_class = SurvivorUpdateSerializer
    

class SurvivorDetailDestroyAPIView(RetrieveDestroyAPIView):
    """ GET & DELETE """
    queryset = Survivor.objects.all()
    serializer_class = SurvivorDetailSerializer
    

class SurvivorReportAPIView(UpdateAPIView):
    """ PUT """
    queryset = Survivor.objects.all()
    serializer_class = SurvivorReportSerializer


class SurvivorInfosAPIView(RetrieveAPIView):
    """ GET """
    def get(self, request):
        
        total = Survivor.objects.all().count()
        infecteds = Survivor.objects.filter(infected=True).count()
        
        
        # For not infecteds percent
        try:
            not_infecteds_percent = 100 * (total - infecteds)/total
        except:
            not_infecteds_percent = 0
            
        # For infecteds percent
        try:
            infecteds_percent = 100 * infecteds / total
        except:
            infecteds_percent = 0
        

        infos = {
            'numOfSurvivors': total,
            'numOfInfecteds': infecteds,
            'percentOfNotInfecteds': not_infecteds_percent,
            'percentOfInfecteds': infecteds_percent,
        }
        
        return Response(infos)