from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  businesses = db.relationship('Business', back_populates='user', lazy='joined')
  reviews = db.relationship('Review', back_populates='user', lazy='joined')
  judgements = db.relationship('Judgement', back_populates='user', lazy='joined')

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "reviews": [review.to_dict() for review in self.reviews]
    }
      # "reviews": {
      #   "id": self.reviews.id,
      #   "user_id": self.reviews.user_id,
      #   "business_id": self.reviews.business_id,
      #   "title": self.reviews.title,
      #   "body": self.reviews.body,
      #   "rating": self.reviews.rating,
      #   "imgURL": self.img_URL
      # },

      #  "businesses": self.businesses,
      #  "judgements": self.judgements
