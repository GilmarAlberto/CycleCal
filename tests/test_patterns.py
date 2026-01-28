from datetime import date, timedelta

import pytest

from cyclecal.patterns import generate_cycle_dates


def test_sunday_yes_two_no():
    base_sunday = date(2026, 2, 1)  # domingo conhecido

    dates = generate_cycle_dates(
        base_date=base_sunday,
        months=2,
        cycle_length=3,
        active_positions=[0],
    )

    assert dates[0] == base_sunday
    assert dates[1] == base_sunday + timedelta(weeks=3)


def test_more_than_12_months_raises_error():
    base_sunday = date(2026, 2, 1)

    with pytest.raises(ValueError):
        generate_cycle_dates(
            base_date=base_sunday,
            months=13,
            cycle_length=3,
            active_positions=[0],
        )
