from flask import Blueprint, jsonify, session, request
from app.models import Business, db
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

# @auth_routes.route('/login', methods=['POST'])
# def login():
#     """
#     Logs a user in
#     """
#     print("hi")
#     form = LoginForm()
#     print(request.get_json())
#     # Get the csrf_token from the request cookie and put it into the
#     # form manually to validate_on_submit can be used
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         # Add the user to the session, we are logged in!
#         user = User.query.filter(User.email == form.data['email']).first()
#         login_user(user)
#         print("HEREEEEEEEEEEEEEEEEEEE")
#         return user.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @auth_routes.route('/logout')
# def logout():
#     """
#     Logs a user out
#     """
#     logout_user()
#     return {'message': 'User logged out'}


# @auth_routes.route('/signup', methods=['POST'])
# def sign_up():
#     """
#     Creates a new user and logs them in
#     """
#     form = SignUpForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User(
#             username=form.data['username'],
#             email=form.data['email'],
#             password=form.data['password']
#         )
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         return user.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}


# @auth_routes.route('/unauthorized')
# def unauthorized():
#     """
#     Returns unauthorized JSON when flask-login authentication fails
#     """
#     return {'errors': ['Unauthorized']}, 401
