from formaters import format_user

def format_object_ranking(json):
  return {
    'user': format_user(json['user']),
    'data': {
      'prospects': 0,
      'opportunity': 0,
      'business': 0,
      'total': json['total'],
      'client': json['client'],
      'lost': json['lost'],
      'delivery': json['delivery'],
      'open': json['open'],
      'reply': json['reply'],
      'bounce': json['bounce'],
      'soft_bounce': json['soft_bounce'],
      'flows': 0,
      'calls': 0,
      'connected_calls': 0,
      'leads': 0,
      'reev_factor': '--'
    }
  }
