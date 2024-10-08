from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import quoted_name

class StoreItem(db.Model):
    __tablename__ = 'store_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(100000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    avg_rating = db.Column(db.Float, nullable = True)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    cartItems = db.relationship("CartItem")
    itemCategories = db.relationship("ItemCategory")
    orderedItems = db.relationship("OrderedItem")

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'price': self.price,
            'avgRating':self.avg_rating,
            'stock':self.stock,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
