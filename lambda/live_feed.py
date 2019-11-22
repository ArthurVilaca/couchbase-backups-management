from formaters import format_user, format_contact, title_by_event_kind

def format_object_live_feed(json):
  return {
    'user': format_user(json['user']),
    'contact': format_contact(json['contact']),
    'detailed_type': json['type'] + '-' + json['event_kind'],
    'title': title_by_event_kind(json['type'], json['event_kind']),
    'created_at': json['created_at']
  }
