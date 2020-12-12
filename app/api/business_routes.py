from flask import Blueprint, jsonify, session, request
from app.models import Business, Review, db
from app.forms import ReviewForm
from flask_login import login_required


business_routes = Blueprint('business', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@business_routes.route('/')
def fetchBusinesses():
    businesses = Business.query.order_by(Business.name).all()
    return{"businesses": [business.to_dict() for business in businesses]}

@business_routes.route('/<int:id>')
@login_required
def business(id):
    business = Business.query.get(id)
    return business.to_dict()

@business_routes.route('/<int:business_id>/reviews', methods=['POST'])
@login_required
def submitReview(business_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      data = request.json
      print(data, "heeeeeeerrree")
      review = Review(
          user_id=data['user_id'],
          business_id=data['business_id'],
          title=form.data['title'],
          body=form.data['body'],
          rating=form.data['rating']
      )
      print(review.to_dict())
      db.session.add(review)
      db.session.commit()
      return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


