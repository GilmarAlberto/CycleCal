import argparse
from datetime import date

from cyclecal.patterns import generate_cycle_dates


def main():
    parser = argparse.ArgumentParser(
        description="CycleCal - rule-based cyclic scheduling"
    )

    parser.add_argument(
        "--base-date",
        required=True,
        help="Base date in ISO format (YYYY-MM-DD)",
    )
    parser.add_argument(
        "--months",
        type=int,
        default=12,
        help="Months ahead to generate (max 12)",
    )
    parser.add_argument(
        "--cycle",
        type=int,
        required=True,
        help="Cycle length in weeks",
    )
    parser.add_argument(
        "--active",
        type=int,
        nargs="+",
        required=True,
        help="Active positions in the cycle (e.g. 0)",
    )

    args = parser.parse_args()

    base_date = date.fromisoformat(args.base_date)

    dates = generate_cycle_dates(
        base_date=base_date,
        months=args.months,
        cycle_length=args.cycle,
        active_positions=args.active,
    )

    for d in dates:
        print(d.isoformat())


if __name__ == "__main__":
    main()

