from flask import Blueprint, jsonify, session, request
from app.models import Review, db
from app.forms import LoginForm
from app.forms import ReviewForm
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


@review_routes.route('/submitReview', methods=['POST'])
def submitReview():
    """
    Creates a new user and logs them in
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      data = request.json

      review = Review(
          user_id=data['user_id'],
          business_id=data['business_id'],
          title=form.data['title'],
          body=form.data['body'],
          rating=form.data['rating']
      )
      
      db.session.add(review)
      db.session.commit()
      return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
