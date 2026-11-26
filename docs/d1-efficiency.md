# D1 schedule efficiency

On November 26, 2026, Cloudflare's last-24-hours metrics showed 5.73 million
rows read by the airport/date schedule query, versus 5.83 million total rows
read. The schedule query ran 5,185 times and averaged 55 rows read per returned
row. Daily read usage was the problem observed in these metrics.

## Production database change

`migrations/20261126_schedule_origin_date.sql` was applied in the Cloudflare
console to `howtogowild-seat-ratings` on November 26. It is idempotent for other
environments; do not run schema creation on each request.

Before, the production plan used only `PRIMARY KEY (origin=?)`. After creating
the index and running `PRAGMA optimize`, it uses
`idx_frontier_route_schedules_origin_date (origin=? AND depart_date=?)`.
Indexes use some storage and add write work when indexed keys change.

## Dashboard behavior

- Collapsed calendar, route map, gate map, and departure board panels load no
  schedule snapshots. Opening a panel starts the rolling three-day board load.
- Published airport/date data is checked before requesting D1. A complete
  near-term snapshot must include usable departure and arrival times. Older
  files missing arrivals still use the shared cache so map timing is preserved.
- Concurrent board and calendar requests for the same airport/date share a
  single snapshot lookup. Failed requests are removed so they can be retried.
- Missing airport entries and airports with failed route lookups are unknown,
  not complete empty days. Calendar selection retains the progressive fill.
- The daily builder retains upstream arrival times and durations when present,
  and records failed airports in `incompleteAirports`. It does not invent
  arrival times where the upstream response omits them.

Run `node --test tests/schedule-efficiency.test.mjs` to exercise these paths
with mocked network responses; this does not fill production schedules.

## Verify after deployment

1. Reload with all schedule panels collapsed. The page should make zero
   `airport-schedule-cache` or `airport-schedule` requests.
2. Expand the map/board/calendar and confirm schedules and arrival details load.
   A complete published airport/date should need no shared-cache request.
3. Select an unpublished future date and confirm progressive loading still works.
4. Compare D1's Rows read and the schedule query's Rows read/returned for a
   period starting after the index change. Old usage remains in rolling charts
   and today's accumulated allowance; these changes do not reset the counter.

Actual future daily usage depends on traffic and calendar date lookups. No
stored schedules or user data were deleted by this change.
