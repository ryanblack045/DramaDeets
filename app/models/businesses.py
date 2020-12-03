from .db import db


class Business(db.Model):
  __tablename__ = 'businesses'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  name = db.Column(db.String(100), nullable = False, unique = True)
  description = db.Column(db.Text, nullable = False)
  lat = db.Column(db.String(20), nullable=False)
  lng = db.Column(db.String(20), nullable=False)
  address = db.Column(db.String(100), nullable=False)
  state = db.Column(db.String(15), nullable=False)
  zipcode = db.Column(db.String(10), nullable=False)
  imgURL = db.Column(db.String, nullable=False)

  types = db.relationship('BusinessType', back_populates='business', lazy='joined')
  judgements = db.relationship('Judgement', back_populates='business', lazy='joined')
  user = db.relationship('User', back_populates='businesses', lazy='joined')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "name": self.name,
      "description": self.description,
      "lat": self.lat,
      "lng": self.lng,
      "address": self.address,
      "state": self.state,
      "zipcode": self.zipcode,
      "imgURL": self.imgURL
    }
