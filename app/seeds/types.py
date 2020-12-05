from app.models import db, Type


def seed_types():

    photographer = Type(title="Photographer")
    oncameraClass = Type(title="On camera class")
    school = Type(title="Acting School")
    sceneStudy = Type(title="Scene Study")


    db.session.add(photographer)
    db.session.add(oncameraClass)
    db.session.add(school)
    db.session.add(sceneStudy)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_types():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
