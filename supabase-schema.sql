-- ─────────────────────────────────────────────────────────────
--  BRYNDAL HUB — Supabase Schema
--  Paste this entire file into: Supabase → SQL Editor → Run
-- ─────────────────────────────────────────────────────────────

-- Schools table
create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  strategy text,
  sat_range text,
  act_range text,
  deadline text,
  interview text,
  status text default 'not-started',
  chance text,
  chance_note text,
  notes text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Essays table
create table if not exists essays (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  word_count integer,
  due text,
  status text default 'not-started',
  notes text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- SAT practice tests table
create table if not exists sat_tests (
  id uuid primary key default gen_random_uuid(),
  test_date date not null,
  test_name text,
  verbal integer,
  math integer,
  notes text,
  created_at timestamptz default now()
);

-- ACT practice tests table
create table if not exists act_tests (
  id uuid primary key default gen_random_uuid(),
  test_date date not null,
  english integer,
  math integer,
  reading integer,
  science integer,
  composite integer,
  notes text,
  created_at timestamptz default now()
);

-- Checklist table
create table if not exists checklist (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  done boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Enable public read/write (no auth needed since URL is private)
alter table schools   enable row level security;
alter table essays    enable row level security;
alter table sat_tests enable row level security;
alter table act_tests enable row level security;
alter table checklist enable row level security;

create policy "public access" on schools   for all using (true) with check (true);
create policy "public access" on essays    for all using (true) with check (true);
create policy "public access" on sat_tests for all using (true) with check (true);
create policy "public access" on act_tests for all using (true) with check (true);
create policy "public access" on checklist for all using (true) with check (true);

-- ─────────────────────────────────────────────────────────────
--  SEED DATA — Schools
-- ─────────────────────────────────────────────────────────────
insert into schools (name, strategy, sat_range, act_range, deadline, interview, status, chance, chance_note, notes, sort_order) values
('Boston College',          'ED',      '1440–1550', '33–35', 'Nov 1',  null,                                          'not-started', 'good',      'Scores at 75th percentile. ED gives ~30% boost. Ever to Excel acceptance is a strong signal of fit.',              'Ever to Excel program — accepted. ED gives ~30% boost.',                                           1),
('Wake Forest',             'Early',   '1390–1530', '32–34', 'Nov 1',  'Within 5 days of applying — HIGH PRIORITY',  'not-started', 'good',      'SAT/ACT at or above 75th percentile. ~25% overall acceptance rate. Strong EC narrative helps.',                  'Schedule interview immediately after submitting.',                                                 2),
('Villanova',               'EA',      '1310–1490', '30–34', 'Nov 1',  null,                                          'not-started', 'likely',    'Scores well above their range. ~28% acceptance rate. Jesuit Catholic identity is a natural fit.',                 '',                                                                                                 3),
('TCU',                     'EA',      '1220–1430', '27–33', 'Nov 1',  null,                                          'not-started', 'likely',    'Scores significantly above their range. ~38% acceptance rate. Strong safety/match.',                               '',                                                                                                 4),
('Vanderbilt',              'Regular', '1510–1570', '34–36', 'Jan 1',  null,                                          'not-started', 'reach',     '~4.6% acceptance rate. Scores at low end of their range. Debris Zero co-founder and pilot story helps.',          '',                                                                                                 5),
('Duke',                    'Regular', '1500–1570', '34–36', 'Jan 2',  null,                                          'not-started', 'long-reach','~4.8% acceptance rate. Scores at low end of range. Apply for the experience.',                                    '',                                                                                                 6),
('Notre Dame',              'Regular', '1470–1540', '33–35', 'Jan 1',  null,                                          'not-started', 'reach',     '~11% acceptance rate. Catholic identity + pilot + nonprofit founder is compelling. Possible but selective.',       'Strong Catholic identity; co-founder of Debris Zero is a compelling differentiator.',              7),
('University of Michigan',  'Regular', '1350–1530', '31–34', 'Feb 1',  null,                                          'not-started', 'possible',  '~15% acceptance rate, much lower for out-of-state. Scores at 75th percentile.',                                   'Test required for 2026-27 cycle. Public Ivy.',                                                     8),
('UVA',                     'Regular', '1380–1500', '31–35', 'Jan 1',  null,                                          'not-started', 'possible',  'Scores above range but OOS very competitive (~11%). Essays are critical.',                                         'Strong out-of-state competition — essays matter.',                                                 9),
('SMU',                     'EA',      '1360–1490', '30–34', 'Nov 1',  null,                                          'not-started', 'likely',    'Scores above 75th percentile. ~40% acceptance rate. Chase is a very strong applicant here.',                      'Dallas location. Strong business school.',                                                        10),
('UT Austin',               'Regular', '1230–1500', '27–34', 'Dec 1',  null,                                          'not-started', 'possible',  'Scores at top of range. OOS applicants face tougher competition. Aerospace/pilot angle resonates.',               'Test required. Top 6% auto-admit for TX residents only.',                                         11),
('Clemson',                 'Regular', '1250–1400', '28–32', 'Dec 1',  null,                                          'not-started', 'likely',    'Scores well above range. 38% acceptance rate. Strong match/safety.',                                               '38% acceptance rate.',                                                                            12),
('UT Knoxville',            'Regular', '1210–1360', '25–31', 'Dec 15', null,                                          'not-started', 'likely',    'Scores significantly above range. OOS ~33% acceptance rate. Solid safety.',                                        'Out-of-state acceptance ~33%.',                                                                   13),
('College of the Holy Cross','EA',     '1240–1410', '27–32', 'Nov 15', null,                                          'not-started', 'likely',    'Scores well above range. 18% acceptance rate. Jesuit Catholic mission aligns well.',                              'Jesuit liberal arts in Worcester, MA.',                                                           14);

-- ─────────────────────────────────────────────────────────────
--  SEED DATA — Essays
-- ─────────────────────────────────────────────────────────────
insert into essays (name, word_count, due, status, sort_order) values
('Common App Personal Statement', 650,  'Aug 1 (goal)', 'not-started', 1),
('Boston College — Why BC?',      400,  'Nov 1',        'not-started', 2),
('Wake Forest supplemental',      null, 'Nov 1',        'not-started', 3),
('Vanderbilt supplemental',       null, 'Jan 1',        'not-started', 4);

-- ─────────────────────────────────────────────────────────────
--  SEED DATA — Checklist
-- ─────────────────────────────────────────────────────────────
insert into checklist (text, done, sort_order) values
('Register for August 22 SAT',                              false, 1),
('Decide on July 11 ACT — registration closes ~June 6',     false, 2),
('Request teacher recommendations by end of June',          false, 3),
('Request counselor recommendation',                        false, 4),
('Begin Common App personal statement',                     false, 5),
('Submit BC ED application by Nov 1',                       false, 6),
('Schedule Wake Forest interview within 5 days of applying',false, 7);
