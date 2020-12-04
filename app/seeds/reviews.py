from app.models import db, Review


def seed_reviews():

    esperReview = Review(user_id=3, title="Tough but worth it", body="This program is extremly tough and time consuming...but it's worth it. I fell like it gave me the foundation I needed.",
    rating=9,)
    davidType = BusinessType(type_id=1, business_id=4)
    stephanieType = BusinessType(type_id=1, business_id=3)
    krakowerType = BusinessType(type_id=3, business_id=1)
    krakowerType2 = BusinessType(type_id=4, business_id=1)
    barrowType= BusinessType(type_id=4, business_id=2)



    db.session.add(esperType)
    db.session.add(davidType)
    db.session.add(stephanieType)
    db.session.add(krakowerType)
    db.session.add(krakowerType2)
    db.session.add(barrowType)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_reviews():
    db.session.execute('TRUNCATE businessTypes;')
    db.session.commit()
