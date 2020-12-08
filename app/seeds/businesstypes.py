from app.models import db, BusinessType


def seed_businessTypes():

    esperType = BusinessType(type_id=3, business_id=5)
    davidType = BusinessType(type_id=1, business_id=4)
    stephanieType = BusinessType(type_id=1, business_id=3)
    krakowerType = BusinessType(type_id=3, business_id=1)
    krakowerType2 = BusinessType(type_id=4, business_id=1)
    krakowerType3 = BusinessType(type_id=2, business_id=1)
    barrowType = BusinessType(type_id=4, business_id=2)
    barrowType2 = BusinessType(type_id=2, business_id=2)
    barrowType3 = BusinessType(type_id=3, business_id=2)




    db.session.add(esperType)
    db.session.add(davidType)
    db.session.add(stephanieType)
    db.session.add(krakowerType)
    db.session.add(krakowerType2)
    db.session.add(krakowerType3)
    db.session.add(barrowType)
    db.session.add(barrowType2)
    db.session.add(barrowType3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_businessTypes():
    db.session.execute('TRUNCATE "businessTypes" RESTART IDENTITY CASCADE;')
    db.session.commit()
