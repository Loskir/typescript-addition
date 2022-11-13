type AddDigitsCore<A extends string, B extends string> = A extends "0" ? (
    B extends "0" ? ["0", false]
      : B extends "1" ? ["1", false]
      : B extends "2" ? ["2", false]
      : B extends "3" ? ["3", false]
      : B extends "4" ? ["4", false]
      : B extends "5" ? ["5", false]
      : B extends "6" ? ["6", false]
      : B extends "7" ? ["7", false]
      : B extends "8" ? ["8", false]
      : B extends "9" ? ["9", false]
      : never
  )
  : A extends "1" ? (
      B extends "0" ? ["1", false]
        : B extends "1" ? ["2", false]
        : B extends "2" ? ["3", false]
        : B extends "3" ? ["4", false]
        : B extends "4" ? ["5", false]
        : B extends "5" ? ["6", false]
        : B extends "6" ? ["7", false]
        : B extends "7" ? ["8", false]
        : B extends "8" ? ["9", false]
        : B extends "9" ? ["0", true]
        : never
    )
  : A extends "2" ? (
      B extends "0" ? ["2", false]
        : B extends "1" ? ["3", false]
        : B extends "2" ? ["4", false]
        : B extends "3" ? ["5", false]
        : B extends "4" ? ["6", false]
        : B extends "5" ? ["7", false]
        : B extends "6" ? ["8", false]
        : B extends "7" ? ["9", false]
        : B extends "8" ? ["0", true]
        : B extends "9" ? ["1", true]
        : never
    )
  : A extends "3" ? (
      B extends "0" ? ["3", false]
        : B extends "1" ? ["4", false]
        : B extends "2" ? ["5", false]
        : B extends "3" ? ["6", false]
        : B extends "4" ? ["7", false]
        : B extends "5" ? ["8", false]
        : B extends "6" ? ["9", false]
        : B extends "7" ? ["0", true]
        : B extends "8" ? ["1", true]
        : B extends "9" ? ["2", true]
        : never
    )
  : A extends "4" ? (
      B extends "0" ? ["4", false]
        : B extends "1" ? ["5", false]
        : B extends "2" ? ["6", false]
        : B extends "3" ? ["7", false]
        : B extends "4" ? ["8", false]
        : B extends "5" ? ["9", false]
        : B extends "6" ? ["0", true]
        : B extends "7" ? ["1", true]
        : B extends "8" ? ["2", true]
        : B extends "9" ? ["3", true]
        : never
    )
  : A extends "5" ? (
      B extends "0" ? ["5", false]
        : B extends "1" ? ["6", false]
        : B extends "2" ? ["7", false]
        : B extends "3" ? ["8", false]
        : B extends "4" ? ["9", false]
        : B extends "5" ? ["0", true]
        : B extends "6" ? ["1", true]
        : B extends "7" ? ["2", true]
        : B extends "8" ? ["3", true]
        : B extends "9" ? ["4", true]
        : never
    )
  : A extends "6" ? (
      B extends "0" ? ["6", false]
        : B extends "1" ? ["7", false]
        : B extends "2" ? ["8", false]
        : B extends "3" ? ["9", false]
        : B extends "4" ? ["0", true]
        : B extends "5" ? ["1", true]
        : B extends "6" ? ["2", true]
        : B extends "7" ? ["3", true]
        : B extends "8" ? ["4", true]
        : B extends "9" ? ["5", true]
        : never
    )
  : A extends "7" ? (
      B extends "0" ? ["7", false]
        : B extends "1" ? ["8", false]
        : B extends "2" ? ["9", false]
        : B extends "3" ? ["0", true]
        : B extends "4" ? ["1", true]
        : B extends "5" ? ["2", true]
        : B extends "6" ? ["3", true]
        : B extends "7" ? ["4", true]
        : B extends "8" ? ["5", true]
        : B extends "9" ? ["6", true]
        : never
    )
  : A extends "8" ? (
      B extends "0" ? ["8", false]
        : B extends "1" ? ["9", false]
        : B extends "2" ? ["0", true]
        : B extends "3" ? ["1", true]
        : B extends "4" ? ["2", true]
        : B extends "5" ? ["3", true]
        : B extends "6" ? ["4", true]
        : B extends "7" ? ["5", true]
        : B extends "8" ? ["6", true]
        : B extends "9" ? ["7", true]
        : never
    )
  : A extends "9" ? (
      B extends "0" ? ["9", false]
        : B extends "1" ? ["0", true]
        : B extends "2" ? ["1", true]
        : B extends "3" ? ["2", true]
        : B extends "4" ? ["3", true]
        : B extends "5" ? ["4", true]
        : B extends "6" ? ["5", true]
        : B extends "7" ? ["6", true]
        : B extends "8" ? ["7", true]
        : B extends "9" ? ["8", true]
        : never
    )
  : never;

type Shift<T extends any[]> = ((...v: T) => void) extends
  ((v: any, ...rest: infer V) => void) ? V : [];

type StringToChars<T extends string> = T extends `${infer C}${infer Rest}`
  ? [C, ...StringToChars<Rest>]
  : [];
type NumToChars<T extends number> = StringToChars<`${T}`>;

type StripZeros<T extends string> = T extends `0${infer V}` ? V : T;
type CharsToString<T extends any[]> = T[0] extends undefined ? ""
  : `${T[0]}${CharsToString<Shift<T>>}`;

type AddOne<T extends [string, boolean]> = [
  AddDigitsCore<T[0], "1">[0],
  AddDigitsCore<T[0], "1">[1] extends true ? true : T[1],
];

type AddDigits<
  A extends string,
  B extends string,
  Leftover extends boolean = false,
> = Leftover extends true ? AddOne<AddDigitsCore<A, B>> : AddDigitsCore<A, B>;

type Reverse<T extends any[]> = T extends [infer V, ...infer Rest]
  ? [...Reverse<Rest>, V]
  : [];

// deno-fmt-ignore
type FallbackToZero<T extends string | undefined> = T extends undefined ? "0" : T;

type AddCore<
  A extends string[],
  B extends string[],
  Leftover extends boolean = false,
> = true extends (
  & (A[0] extends undefined ? true : false)
  & (B[0] extends undefined ? true : false)
) ? Leftover extends true ? "1" : ""
  : `${AddCore<
    Shift<A>,
    Shift<B>,
    AddDigits<
      FallbackToZero<A[0]>,
      FallbackToZero<B[0]>,
      Leftover
    >[1]
  >}${AddDigits<
    FallbackToZero<A[0]>,
    FallbackToZero<B[0]>,
    Leftover
  >[0]}`;

export type Add<A extends number, B extends number> = AddCore<
  Reverse<NumToChars<A>>,
  Reverse<NumToChars<B>>
>;
