from .db import db


class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable = False)
  body = db.Column(db.Text, nullable = False)
  rating = db.Column(db.SmallInteger, nullable=False)
  imgURL = db.Column(db.String, nullable=False)

  user = db.relationship('User', back_populates='reviews', lazy='joined')
  judements = db.relationship('Judgement', back_populates='review', lazy='joined')

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "title": self.title,
      "body": self.body,
      "rating": self.rating,
      "imgURL": self.imgURL
    }
