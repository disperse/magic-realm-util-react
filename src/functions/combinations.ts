export default function* combinations(array: number[], n: number) {
  const combination: number[] = [];

  function* recur(index: number): Generator<number[]> {
    if (index === n) {
      if (combination.reduce((cv, pv) => cv + pv, 0) === 5) {
        yield combination.slice();
      }
      return undefined;
    }
    for (let i = 0; i < array.length; i++) {
      combination[index] = array[i];
      yield* recur(index + 1);
    }
    return undefined;
  }

  yield* recur(0);
}
