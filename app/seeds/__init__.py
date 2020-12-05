from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .types import seed_types, undo_types
from .judgements import seed_judgements, undo_judgments
from .businessTypes import seed_businessTypes, undo_businessTypes
from .reviews import seed_reviews, undo_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_businesses()
    seed_reviews()
    seed_types()
    seed_businessTypes()
    seed_judgements()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_judgments()
    undo_businessTypes()
    undo_types()
    undo_reviews()
    undo_businesses()
    undo_users()
    # Add other undo functions here
