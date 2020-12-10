from .db import db


class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
  title = db.Column(db.String(100), nullable = False)
  body = db.Column(db.Text, nullable = False)
  rating = db.Column(db.SmallInteger, nullable=False)
  imgURL = db.Column(db.String, nullable=True)

  user = db.relationship('User', back_populates='reviews',) #lazy='joined')
  judgements = db.relationship('Judgement', back_populates='review',)# lazy='joined')
  business = db.relationship('Business', back_populates='reviews',) # lazy='joined')

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.user_id,
      "title": self.title,
      "body": self.body,
      "rating": self.rating,
      "imgURL": self.imgURL,
      "businesId": self.business_id,
      "judgements": [judgement.to_dict() for judgement in self.judgements],
    }

  # def info()
