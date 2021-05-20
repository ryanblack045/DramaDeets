from flask import Blueprint, jsonify, session, request
from app.models import Business, Review, BusinessType, Type, db
from app.forms import ReviewForm
from flask_login import login_required
from sqlalchemy.sql import func


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


@business_routes.route('/<int:business_id>', methods=['POST'])
@login_required
def businessTypeAdd(business_id):
    data = request.json
    businessType = BusinessType(
      type_id=data['typeId'],
      business_id=data['business_id'],
    )
    db.session.add(businessType)
    db.session.commit()
    return businessType.to_dict()

@business_routes.route('/types', methods=['POST'])
@login_required
def typeAdd():
    data = request.json
    type = Type( title=data['title'])
    db.session.add(type)
    db.session.commit()
    return type.to_dict()

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

@business_routes.route('/', methods=['POST'])
@login_required
def createBusiness():
        data = request.json
        business = Business(
            user_id=data['user_id'],
            name=data['name'],
            description=data['description'],
            lat=data['lat'],
            lng=data['lng'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zipcode=data['zipcode'],
            website=data['website'],
            contact=data['contact'],
            imgURL=data['imgURL'],
        )
        db.session.add(business)
        db.session.commit()
        return business.to_dict()


@business_routes.route('/types')
def fetchTypes():
    types = Type.query.order_by(Type.id).all()
    return {"types": [type.to_dict() for type in types]}


@business_routes.route('/<int:id>', methods=['PUT'])
def updateReview(id):
    data = request.json
    name = data['name'],
    lat = data['lat'],
    lng = data['lng'],
    address = data['address'],
    city = data['name'],
    state = data['state'],
    zipcode = data['zipcode'],
    website = data['website'],
    contact = data['contact']

    business = Business.query.get(id)
    business.name = name
    business.lat = lat
    business.lng = lng
    business.address = address
    business.city = city
    business.state = state
    business.zipcode = zipcode
    business.website = website
    business.contact = contact
    business.updated_at = func.now()

    db.session.commit()
    return business.to_dict()



@business_routes.route('/<int:id>', methods=['DELETE'])
def deleteBusiness(id):

    business = Business.query.get(id)
    if business:
      db.session.delete(business)
      db.session.commit()
      return {'message': 'Review was successfully deleted'}
    else:
      return{'errors':'Review was not found'}
