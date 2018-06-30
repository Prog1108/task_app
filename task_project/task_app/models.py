import uuid

from django.db import models
from django.utils import timezone


class TaskItem(models.Model):
    task_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    text = models.CharField(max_length=150)
    author = models.ForeignKey(
        'auth.User',
        on_delete=models.CASCADE,
        null=True
    )
    checked = models.BooleanField(default=False)
<<<<<<< HEAD
    created_at = models.DateField(
        default=timezone.now()
    )
=======
    created_at = models.DateField('日付', auto_now_add=True)
>>>>>>> 39c0a65174372f665f878c94b6723fed117b5963

    def __str__(self):
        return self.text
