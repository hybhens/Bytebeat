d = t * 1.125 ** '14231425'[t >> 18 & 7],
((d | d * 1.005) & 255) / 16 +
((d / 2 | d / 2 * 1.01) & 255) / 16 +
((d * 1.5 | d * 1.501) & 255) / 16 +
((d / 2 * 1.5 | d / 2 * 1.5005) & 255) / 16 +
(x => [0, x, x, x, x, x, x, x][t >> 20 & 7])(
	(t * 1.125 ** (((t >> 13 & 3) + 1) * ((t >> 15 & 1) + 1)) / 32 & 24 |
		t * 1.125 ** (((t >> 13 & 3) + 1) * ((t >> 15 & 1) + 1)) / 32 * 1.005 & 24) +
	(t * 1.125 ** (((t >> 13 & 3) + 1) * ((t >> 15 & 1) + 1)) / 16 & 24 |
		t * 1.125 ** (((t >> 13 & 3) + 1) * ((t >> 15 & 1) + 1)) / 16 * 1.001 & 24)
) +
(x => [0, x, x, x][t >> 21 & 3])(abs(1024 * log(t & 16383) % 256 - 128) / 2) + (
	random() * ((-t >> 9 & 15) + 1) +
	random() * ((-t >> 11 & 15) + 1) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.375 >> 10 & 1) + 1) / 4 & 4) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.25 >> 11 & 1) + 1) / 6 & 4) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.375 >> 10 & 1) + 1) / 16 & 4) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.25 >> 11 & 1) + 1) / 24 & 4) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.375 >> 10 & 1) + 1) / 4 * 1.0001 & 4) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.25 >> 11 & 1) + 1) / 6 * 1.0001 & 4) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.375 >> 10 & 1) + 1) / 16 * 1.0005 & 4) +
	(t * 1.0625 ** '1423'[t >> 17 & 3] * ((t / 1.25 >> 11 & 1) + 1) / 24 * 1.0005 & 4)
) * (t >> 22 & 1);
