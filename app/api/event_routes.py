from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, db, StoreItem, MembershipType, Member, Event
from app.forms.review_form import ReviewForm

event_routes = Blueprint('events', __name__ )


## Works on backend
@event_routes.route('/')
def get_all_events():
    '''Gets all events from the database'''
    events = [x.to_dict() for x in Event.query.all()]

    return {"Events": events}


@event_routes.route('/<int:event_id>')
def get_event_information(event_id):
    '''Get specific event details'''
    event = Event.query.filter_by(event_id=event_id).first()
    if event == None:
        return {"message": "Event could not be found"}, 404

    eventObj = event.to_dict()

    return {"Event": eventObj}

@event_routes.route('/members')
def get_member_events():
    '''Allows users to search for "Members Only" events'''
    events = [x.to_dict() for x in Event.query.filter((Event.members_only == True) | (Event.members_only == 1)).all()]

    if events !=None:
        return {"Events": events}
    else:
        return {"message": "No Events found"}, 404

