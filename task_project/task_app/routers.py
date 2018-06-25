from rest_framework import routers

from task_app.views import TaskItemViewSet, TaskItemDoneViewSet


router = routers.DefaultRouter()
router.register(r'taskitem', TaskItemViewSet)
router.register(r'taskitemdone', TaskItemDoneViewSet)
