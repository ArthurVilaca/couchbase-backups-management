import i18n
import re

i18n.load_path.append('./')
i18n.set('locale', 'pt-BR')

def convert(name):
  s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def title_by_event_kind(event_type, event_kind):
  return i18n.t(f'contact_events.{convert(event_type)}.title.{event_kind}')

def format_user(user):
  return { 'name': user['name'], 'id': user['id'] }

def format_contact(contact):
  return { 'full_name': contact['full_name'] }
