from .db import db


class Judgment(db.Model):
  __tablename__ = 'judgements'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"), nullable=False)
  business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
  recommend = db.Column(db.Boolean)
  avoid = db.Column(db.Boolean)

  user = db.relationship('User', back_populates='judgements', lazy='joined')
  review = db.relationship('Review', back_populates='judgements', lazy='joined')
  business = db.relationship('Business', back_populates='judgements', lazy='joined')

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "reviewId": self.reviewId,
      "businessId": self.businessId,
      "recommend": self.recommend,
      "neutral": self.neutral
    }
