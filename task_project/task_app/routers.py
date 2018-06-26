from rest_framework import routers

from task_app.views import TaskItemViewSet


router = routers.DefaultRouter()
router.register(r'taskitem', TaskItemViewSet)
