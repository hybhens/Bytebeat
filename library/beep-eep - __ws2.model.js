Cm = [2.97, 3.33, 3.53, 3.96, 4.445, 4.71, 5.285],
xx = a => [
  [2.97, 3.53],
  [3.53, 3.96],
  [3.96, 4.445],
  [4.445, 5.285]
][a],
sq = v => [
  [0, 0, 1, 1],
  [0, 1, 1, 1],
  [0, 0, 1, 1]
][v][ia(t / 4e5) % 4],
ia = a => int(abs(a)),
f = x => {
  wave = 0.6 * abs((sin(x / 4e4) * (t > 8e6 ? 6 : 1)) + 4);
  vol = x / 2e3 % 10;
  return sin(log(0.5 + (x / 1e3) % 20) * 40) * 2 *
    e((x / 2) / 1e3, 1.5, 0.2) * sq(0) * (t > 7e6 ? 0 : 1) +
    sin(x + sin(x) * 1e9 * e(x / 1.5e3, 3, 0.05)) * 1 *
    e(x / 3e3, 4, 0.2) * sq(1) * (t > 7e6 ? 0 : 1) +
    sin(x + sin(x) * 1e9) * 1 *
    e(x / 0.5e3 * ia(sin(x / 1e4) + 2), 3, 0.2) * sq(2) * (t > 7e6 ? 0 : 1) +
    (sin(wave ** ((x / 1000) * 3 * Cm[0] % 2)) +
      sin(wave ** ((x / 1e3) * 3 * Cm[4] % 2)) +
      sin(wave ** ((x / 1e3) * 3 * Cm[6] % 2))) * vol ** (t > 8e6 ? 0 : 1) -
    sin((wave + 0.3) ** ((x / 1e3) * 6 * xx(int(t / 64e3) % 4)[int(t / 8e3) % 2] % 2)) *
    1.2 * e(x / 4e3, 0.9, 0.35) * (t > 2e6 ? 1 : 0) +
    sin((wave + ia(sin(t / 1e8) * 8)) **
      ((x / 1e3) * 3 * xx(int(t / 256e3) % 4)[int(t / 64e3) % 2] % 2)) *
    6 * (t > 5.2e6 ? 1 : 0) -
    sin(wave ** ((x / 1e3) * 1 * Cm[[0, 0, 2, 4][ia(t / 8e4) % 4]] % 2)) * vol * 1.5;
},
e = (s, l, n) => {
  return int(exp(-((s % 20) * n) * l) * 20);
},
out = n => {
  v = 0;
  for(i = 1, k = n; i < k; i++) {
    v += f(t / 1 + 8e3 * i ** 2) * (0.5 / i);
  }
  return v;
},
128 + out(2 + ia(sin(t / 8e5) * 3 * (t > 15e6 ? 3 : 1))) * 2.8;
