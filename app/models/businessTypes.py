from .db import db

class BusinessType(db.Model):
  __tablename__ = 'businessTypes'

  id = db.Column(db.Integer, primary_key = True)
  type_id = db.Column(db.Integer, db.ForeignKey("types.id"), nullable = False)
  business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)

  type = db.relationship("Type", back_populates="businessTypes")
  business = db.relationship("Business", back_populates="types")

  def to_dict(self):
    return {
      "id": self.id,
      "type_id": self.type_id,
      "business_id": self.business_id
    }
