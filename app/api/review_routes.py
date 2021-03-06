from flask import Blueprint, jsonify, session, request
from app.models import Review, Judgement, db
from app.forms import LoginForm
from app.forms import ReviewForm
from sqlalchemy.sql import func
from flask_login import current_user, login_user, logout_user, login_required

review_routes = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@review_routes.route('/<int:review_id>', methods=['PUT'])
def updateReview(review_id):
    data = request.json
    title=data['title'],
    body=data['body'],
    rating = data['rating']

    review = Review.query.get(review_id)
    review.title = title
    review.body = body
    review.rating = rating
    review.updated_at = func.now()

    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:review_id>', methods=['DELETE'])
def deleteReview(review_id):

    review = Review.query.get(review_id)
    if review:
      db.session.delete(review)
      db.session.commit()
      return {'message': 'Review was successfully deleted'}
    else:
      return{'errors':'Review was not found'}



@review_routes.route('/<int:review_id>/like', methods=['POST'])
def judgeReview(review_id):
    data = request.json
    judgement = Judgement(
        user_id=data['user_id'],
        business_id=data['business_id'],
        review_id=data['review_id'],
        recommend=data['recommend'],
        avoid=data['avoid']
    )

    db.session.add(judgement)
    db.session.commit()
    return judgement.to_dict()


@review_routes.route('/like//<int:id>', methods=['DELETE'])
def deleteJudgment(id):
  judgement = Judgement.query.get(id)
  if judgement:
    db.session.delete(judgement)
    db.session.commit()
    return {'message': 'Judgement was successfully deleted'}
  else:
    return{'errors':'Judgement was not found'}
