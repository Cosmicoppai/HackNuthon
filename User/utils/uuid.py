import uuid
import random


def generate_id(x: int = 15) -> str:
    return random.randint(10 ** (x - 1), 10 ** x - 1)


if __name__ == "__main__":
    a = set()
    for i in range(10000000):
        a.add(generate_id())

    print(len(a) == 10000000)
    print(len(a))
