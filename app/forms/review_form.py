from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# def ratingLevel(form, field):
#     print("Checking if user exits", field.data)
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError("User is already registered.")


class ReviewForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    body = StringField('email', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired() ])
