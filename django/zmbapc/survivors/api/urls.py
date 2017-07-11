from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    SurvivorCreateAPIView,
    SurvivorDetailDestroyAPIView,
    SurvivorInfosAPIView,
    SurvivorListAPIView,
    SurvivorReportAPIView,
    SurvivorUpdateAPIView,
)

urlpatterns = [
    url(r'^$', SurvivorListAPIView.as_view(), name="list"),
    url(r'^create/$', SurvivorCreateAPIView.as_view(), name="create"),
    url(r'^infos/$', SurvivorInfosAPIView.as_view(), name="infos"),
    url(r'^(?P<pk>[0-9]+)/$', SurvivorDetailDestroyAPIView.as_view(), name="detail-destroy"),
    url(r'^update/(?P<pk>[0-9]+)/$', SurvivorUpdateAPIView.as_view(), name="update"),
    url(r'^report/(?P<pk>[0-9]+)/$', SurvivorReportAPIView.as_view(), name="report"),
]

urlpatterns = format_suffix_patterns(urlpatterns)