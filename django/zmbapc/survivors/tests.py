from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse
from django.test import TestCase

class ViewTestCase(TestCase):
    """Test suite for the api views """
    
    def setUp(self):
        """ Define the test client and test variables """
        self.client = APIClient()
        self.survivor_data = {
            'name': 'Noah',
            'age': 23,
            'gender': 'M',
            'latitude': '34627',
            'longitude': '43532'
        }
        
        # there's something wrong with the path (first param)
        self.response = self.client.post(
            'create/',
            self.survivor_data,
            format="json"
        )
        
    def test_api_can_create_a_survivor(self):
        """ Test the api has survivor creation capability """
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)