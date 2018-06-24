import uuid

from django.db import models


class TaskItem(models.Model):
    task_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    text = models.CharField(max_length=50)
    author = models.ForeignKey(
        'auth.User',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return str(self.text)
