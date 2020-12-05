from app.models import db, Judgement


def seed_judgements():

    esperJudgement = Judgement(user_id=1, review_id=1, business_id=5, recommend=True, avoid=False)
    esperJudgement2 = Judgement(user_id=2, review_id=1, business_id=5, recommend=True, avoid=False)
    esperJudgement3 = Judgement(user_id=5, review_id=1, business_id=5, recommend=False, avoid=True)
    esperJudgement4 = Judgement(user_id=4, review_id=2, business_id=5, recommend=True, avoid=False)
    esperJudgement5 = Judgement(user_id=3, review_id=2, business_id=5, recommend=False, avoid=True)
    esperJudgement6 = Judgement(user_id=2, review_id=2, business_id=5, recommend=False, avoid=True)
    stephanieJudgement = Judgement(user_id=1, review_id=3, business_id=5, recommend=True, avoid=False)
    stephanieJudgement2 = Judgement(user_id=2, review_id=3, business_id=5, recommend=True, avoid=False)
    stephanieJudgement3 = Judgement(user_id=3, review_id=3, business_id=5, recommend=True, avoid=False)
    stephanieJudgement4 = Judgement(user_id=4, review_id=4, business_id=5, recommend=True, avoid=False)
    stephanieJudgement5 = Judgement(user_id=5, review_id=4, business_id=5, recommend=True, avoid=False)
    stephanieJudgement6 = Judgement(user_id=1, review_id=4, business_id=5, recommend=True, avoid=False)
    krakowerJudgement = Judgement(user_id=1, review_id=5, business_id=1, recommend=True, avoid=False)
    krakowerJudgement2 = Judgement(user_id=2, review_id=5, business_id=1, recommend=True, avoid=False)
    krakowerJudgement3 = Judgement(user_id=3, review_id=5, business_id=1, recommend=False, avoid=True)
    krakowerJudgement4 = Judgement(user_id=4, review_id=6, business_id=1, recommend=False, avoid=True)
    krakowerJudgement5 = Judgement(user_id=5, review_id=6, business_id=1, recommend=True, avoid=False)
    krakowerJudgement6 = Judgement(user_id=1, review_id=6, business_id=1, recommend=True, avoid=False)
    barrowJudgement = Judgement(user_id=1, review_id=7, business_id=2, recommend=True, avoid=False)
    barrowJudgement2 = Judgement(user_id=2, review_id=7, business_id=2, recommend=True, avoid=False)
    barrowJudgement3 = Judgement(user_id=3, review_id=7, business_id=2, recommend=False, avoid=True)
    barrowJudgement4 = Judgement(user_id=4, review_id=8, business_id=2, recommend=False, avoid=True)
    barrowJudgement5 = Judgement(user_id=5, review_id=8, business_id=2, recommend=True, avoid=False)
    barrowJudgement6 = Judgement(user_id=1, review_id=8, business_id=2, recommend=True, avoid=False)
    davidJudgement = Judgement(user_id=1, review_id=9, business_id=4, recommend=True, avoid=False)
    davidJudgement2 = Judgement(user_id=2, review_id=9, business_id=4, recommend=True, avoid=False)
    davidJudgement3 = Judgement(user_id=3, review_id=9, business_id=4, recommend=False, avoid=True)
    davidJudgement4 = Judgement(user_id=4, review_id=10, business_id=4, recommend=False, avoid=True)
    davidJudgement5 = Judgement(user_id=5, review_id=10, business_id=4, recommend=True, avoid=False)
    davidJudgement6 = Judgement(user_id=1, review_id=10, business_id=4, recommend=True, avoid=False)


    db.session.add(esperJudgement)
    db.session.add(esperJudgement2)
    db.session.add(esperJudgement3)
    db.session.add(esperJudgement4)
    db.session.add(esperJudgement5)
    db.session.add(esperJudgement6)
    db.session.add(stephanieJudgement)
    db.session.add(stephanieJudgement2)
    db.session.add(stephanieJudgement3)
    db.session.add(stephanieJudgement4)
    db.session.add(stephanieJudgement5)
    db.session.add(stephanieJudgement6)
    db.session.add(krakowerJudgement)
    db.session.add(krakowerJudgement2)
    db.session.add(krakowerJudgement3)
    db.session.add(krakowerJudgement4)
    db.session.add(krakowerJudgement5)
    db.session.add(krakowerJudgement6)
    db.session.add(barrowJudgement)
    db.session.add(barrowJudgement2)
    db.session.add(barrowJudgement3)
    db.session.add(barrowJudgement4)
    db.session.add(barrowJudgement5)
    db.session.add(barrowJudgement6)
    db.session.add(davidJudgement)
    db.session.add(davidJudgement2)
    db.session.add(davidJudgement3)
    db.session.add(davidJudgement4)
    db.session.add(davidJudgement5)
    db.session.add(davidJudgement6)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_judgments():
    db.session.execute('TRUNCATE judgements RESTART IDENTITY CASCADE;')
    db.session.commit()
