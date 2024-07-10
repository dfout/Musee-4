from flask.cli import AppGroup
from .users import seed_users, undo_users
from .Museum.artists import seed_artists, undo_artists
from .Museum.admission.admissionTickets import seed_admission_tickets, undo_admission_tickets
from .Store.storeItems import seed_store_items, undo_store_items
from .Store.reviews import seed_reviews, undo_reviews
from .Museum.galleries import seed_galleries, undo_galleries

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_galleries()
        undo_reviews()
        undo_store_items()
        undo_admission_tickets()
        undo_artists()
        undo_users()
    seed_users()
    seed_artists()
    seed_admission_tickets()
    seed_store_items()
    seed_reviews()
    seed_galleries()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_galleries()
    undo_reviews()
    undo_store_items()
    undo_admission_tickets()
    undo_artists()
    undo_users()
    # Add other undo functions here
