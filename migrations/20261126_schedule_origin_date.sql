-- Run once in the D1 database bound as SEAT_RATINGS_DB.
-- Applied to production on 2026-11-26 and verified with EXPLAIN QUERY PLAN.
CREATE INDEX IF NOT EXISTS idx_frontier_route_schedules_origin_date
ON frontier_route_schedules(origin, depart_date);
PRAGMA optimize;
