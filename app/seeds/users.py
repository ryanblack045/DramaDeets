from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    ryan = User(username='Admin', email="infoDramaDeets@gmail.com", password='metoo6447!')
    demo = User(username='Demo', email='demo@aa.io', password='password')
    mark = User(username='Mark', email="mark@aa.io", password='password')
    brandon = User(username='Brandon', email="brandon@aa.io", password='password')
    alycia = User(username='Alycia', email="alycia@aa.io", password='password')

    db.session.add(ryan)
    db.session.add(demo)
    db.session.add(mark)
    db.session.add(brandon)
    db.session.add(alycia)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
