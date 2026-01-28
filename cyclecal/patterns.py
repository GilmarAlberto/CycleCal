from datetime import date, timedelta
from dateutil.relativedelta import relativedelta


MAX_MONTHS_AHEAD = 12


def generate_cycle_dates(
    base_date: date,
    months: int,
    cycle_length: int,
    active_positions: list[int],
) -> list[date]:
    """
    Generate dates based on a cyclic rule.

    Dates are generated up to a maximum of 12 months ahead.

    Example:
    - base_date: a known active date
    - cycle_length: 3
    - active_positions: [0]
    Means: active on week 0, inactive on weeks 1 and 2
    """
    if months > MAX_MONTHS_AHEAD:
        raise ValueError("CycleCal only allows scheduling up to 12 months ahead")

    results = []
    current_date = base_date
    end_date = base_date + relativedelta(months=months)

    position = 0

    while current_date <= end_date:
        if position in active_positions:
            results.append(current_date)

        position = (position + 1) % cycle_length
        current_date += timedelta(weeks=1)

    return results
