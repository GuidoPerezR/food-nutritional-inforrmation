import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(["GET"])
def get_fruit_info(request):
    fruit_name = request.GET.get("fruit", "")
    print(fruit_name)
    try:
        url = f"https://www.fruityvice.com/api/fruit/{fruit_name}"
        response = requests.get(url)
        if response.status_code != 200:
            return Response(
                {"error": "Fruit not found or API error."}, status=response.status_code
            )
        data = response.json()
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
