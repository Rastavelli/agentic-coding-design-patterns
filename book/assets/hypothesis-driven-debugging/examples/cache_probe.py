"""A deterministic teaching fixture; no external services or real customer data."""

import argparse


RECORDS = {("alpha", 42): 100, ("beta", 42): 900, ("beta", 43): 700}


def make_reader(*, use_cache=True, tenant_key=False):
    cache = {}

    def read(tenant, invoice):
        key = (tenant, invoice) if tenant_key else invoice
        if not use_cache:
            return RECORDS[(tenant, invoice)]
        if key not in cache:
            cache[key] = RECORDS[(tenant, invoice)]
        return cache[key]

    return read


def check(name, requests, expected, **options):
    read = make_reader(**options)
    actual = [read(*request) for request in requests]
    passed = actual == expected
    print(f"{name}: expected={expected} actual={actual} {'PASS' if passed else 'FAIL'}")
    return passed


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("experiment", choices=["shared", "bypass", "distinct", "reverse", "fixed"])
    experiment = parser.parse_args().experiment
    shared = [("alpha", 42), ("beta", 42)]
    if experiment == "fixed":
        cases = [
            ("shared", shared, [100, 900]),
            ("reverse", list(reversed(shared)), [900, 100]),
            ("distinct", [("alpha", 42), ("beta", 43)], [100, 700]),
            ("repeat", shared + shared, [100, 900, 100, 900]),
        ]
        results = [check(name, requests, expected, tenant_key=True) for name, requests, expected in cases]
        return all(results)
    if experiment == "distinct":
        return check(experiment, [("alpha", 42), ("beta", 43)], [100, 700])
    if experiment == "reverse":
        return check(experiment, list(reversed(shared)), [900, 100])
    return check(experiment, shared, [100, 900], use_cache=experiment != "bypass")


if __name__ == "__main__":
    raise SystemExit(0 if main() else 1)
