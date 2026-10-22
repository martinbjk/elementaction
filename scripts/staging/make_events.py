"""Skriver granskningsförslag till data/events-staging/<sektion>/<slug>.json.
Tider: lokal tid med rätt UTC-offset (räknas fram med zoneinfo, inkl. sommartid)."""
import json, sys, os
from datetime import datetime
from zoneinfo import ZoneInfo

ROOT = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'events-staging')

def iso(date, time, tz):
    y, m, d = map(int, date.split('-'))
    hh, mm = map(int, time.split(':'))
    return datetime(y, m, d, hh, mm, tzinfo=ZoneInfo(tz)).isoformat()

def write(section, ev):
    start, end = ev.pop('start'), ev.pop('end')
    tz = ev['timezone']
    out = {
        'slug': ev['slug'], 'name': ev['name'],
        **({'series': ev['series']} if ev.get('series') else {}),
        'category': ev['category'], 'level': ev['level'],
        'startDate': iso(start, ev.pop('startTime', '09:00'), tz),
        'endDate': iso(end, ev.pop('endTime', '18:00'), tz),
        'timezone': tz,
        'location': ev['location'],
        'description': ev['description'],
        **({'officialUrl': ev['officialUrl']} if ev.get('officialUrl') else {}),
        **({'organizer': ev['organizer']} if ev.get('organizer') else {}),
        **({'disciplines': ev['disciplines']} if ev.get('disciplines') else {}),
        'source': {'note': ev['note'], 'url': ev['sourceUrl'], 'retrievedAt': '2026-10-22T00:00:00+02:00'},
    }
    d = os.path.join(ROOT, section); os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, out['slug'] + '.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2); f.write('\n')

if __name__ == '__main__':
    section, path = sys.argv[1], sys.argv[2]
    for ev in json.load(open(path, encoding='utf-8')):
        write(section, ev)
    print('ok', section)
