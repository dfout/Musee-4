from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    is_member = db.Column(db.Boolean, nullable=False, default=False)
    first_name=db.Column(db.String(40), nullable=False)
    last_name=db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    # Member = db.relationship('Member', backref='user', uselist=False, cascade='all, delete')

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
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'isMember':self.is_member,
            'firstName': self.first_name,
            'lastName':self.last_name,
            # 'Member':self.Member
        }
    
    def to_dict_no_email_no_last(self):
        return {
            'id': self.id,
            'username': self.username,
            'isMember':self.is_member,
            'firstName':self.first_name,
            # 'Member':self.Member
        }
