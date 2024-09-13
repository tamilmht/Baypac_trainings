# yourapp/management/commands/flush_migrations.py
import os
import shutil
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Flush migrations and database.'

    def handle(self, *args, **kwargs):
        # Delete migration files
        for root, dirs, files in os.walk('.'):
            if 'migrations' in dirs:
                shutil.rmtree(os.path.join(root, 'migrations'))

        # Delete database
        if os.path.exists('db.sqlite3'):
            os.remove('db.sqlite3')

        self.stdout.write(self.style.SUCCESS('Deleted all migration files and database.'))
