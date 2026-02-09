from datetime import date, timedelta
from dateutil.relativedelta import relativedelta

MAX_MONTHS_AHEAD = 12
MAX_DAYS_AHEAD = 365


def generate_cycle_dates(
    base_date: date,
    months: int,
    cycle_length: int,
    active_positions: list[int],
) -> list[date]:
    """
    Generate dates based on a cyclic rule.

    Dates are generated up to a maximum of 12 months / 365 days ahead.
    """
    if months > MAX_MONTHS_AHEAD:
        raise ValueError("CycleCal only allows scheduling up to 12 months ahead")

    results = []
    current_date = base_date

    month_limit = base_date + relativedelta(months=months)
    hard_limit = base_date + timedelta(days=MAX_DAYS_AHEAD)

    end_date = min(month_limit, hard_limit)

    position = 0

    while current_date <= end_date:
        if position in active_positions:
            results.append(current_date)

        position = (position + 1) % cycle_length
        current_date += timedelta(weeks=1)

    return results

