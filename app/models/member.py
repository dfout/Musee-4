from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Member(db.Model):
    __tablename__ = "members"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    membership_type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("membership_types.id")), nullable=False)
    curr_card_holders = db.Column(db.Integer, nullable=False)
    last_charged = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    next_payment = db.Column(db.DateTime(timezone=True), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    users = db.relationship("User")
    membershipTypes = db.relationship("MembershipType")


    def to_dict(self):
        return {
            'id':self.id,
            'userId':self.user_id,
            'membershipTypeId': self.membership_type_id,
            'currCardHolders': self.curr_card_holders,
            'lastCharged': self.last_charged, 
            'nextPayment': self.next_payment,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
