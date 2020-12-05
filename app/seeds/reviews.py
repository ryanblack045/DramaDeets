from app.models import db, Review


def seed_reviews():

    esperReview = Review(user_id=3, title="Tough but worth it", body="This program is extremly tough and time consuming...but it's worth it. I fell like it gave me the foundation I needed.",
    rating=9, imgURL="data:image/png;base64,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",
    business_id=5)
    esperReview2 = Review(user_id=4, title="Good training, bad prep for what comes next.", body="I enjoyed the training however there is no showcase at the end and they do near to nothing to put you in a position to do well in the industry.",
    rating=7, business_id=5)
    stephanieReview = Review(user_id=5, title="Relaxing vibe, overall great experience", body="I really enjoyed my headshot session with Stephanie, eveything was seamless. She is a great communicator, professional and has reasonable prices. I would definitely recommend her.",
    rating=10, business_id=3)
    stephanieReview2 = Review(user_id=1, title="Great prices", body="Her prices are great, locations are great, super fun to work with.",
    rating=9, business_id=3)
    krakowerReview = Review(user_id=1, title="The man knows his stuff", body="My first class with Bob was an eye opener, made me feel like I knew nothing about acting on camera. His approach is technical and can add another layer to your work. It's nearly impossible to get into his class but the wait was worth it in my opinion",
    rating=9,business_id=1)
    krakowerReview2 = Review(user_id=2, title="Definitely worth it", body="His class is expensive and impossible to get into. That being said keep trying to get in, it's worth it. Also he has other teachers that use his technique. I loved Josh Mendalow and Jessica Cummings",
    rating=10,business_id=1)
    barrowReview = Review(user_id=1, title="Amazing community", body="This community is warm, welcoming and inclusive. Their approach to the work is focused on keeping things naturalistc and grounded. For me it was a great experience studying here.",
    rating=10,business_id=2)
    barrowReview2 = Review(user_id=5, title="First class", body="This was my first acting class and I'm hooked. I can't wait come back and try other classes they offer.",
    rating=10, business_id=2)
    davidReview = Review(user_id=1, title="Expensive but worth it", body="David's prices are borderline offensive but I am so happy I did it. The results were above and beyond what I hoped for.",
    rating=8, business_id=4)
    davidReview2 = Review(user_id=4, title="Not sure if the price is worth it", body="He is obviously good at what he does but I've seen other headshots that turn out just as good from a photographer that charges half his price. If you have the money to blow go for it, otherwise I think you can still find a great result for a better price.",
    rating=6,business_id=4)



    db.session.add(esperReview)
    db.session.add(esperReview2)
    db.session.add(stephanieReview)
    db.session.add(stephanieReview2)
    db.session.add(krakowerReview)
    db.session.add(krakowerReview2)
    db.session.add(barrowReview)
    db.session.add(barrowReview2)
    db.session.add(davidReview)
    db.session.add(davidReview2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
