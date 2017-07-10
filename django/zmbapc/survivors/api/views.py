from .serializers import SurvivorCreateSerializer
from rest_framework.generics import ListAPIView


class SurvivorListAPIView(ListAPIView):
    serializer = SurvivorListSerializer
    
