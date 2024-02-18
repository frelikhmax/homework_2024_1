'use strict';

QUnit.module('Тестируем функцию minmax', function () {
        QUnit.test('minmax работает правильно на строках без чисел', function (assert) {
                assert.deepEqual(minmax(''), [undefined, undefined], 'Особый случай, когда в строке нет чисел');
                assert.deepEqual(minmax('мама мыла раму'), [undefined, undefined]);
        });

        QUnit.test('minmax правильно парсит отдельные числа', function (assert) {
                assert.deepEqual(minmax('0'), [0, 0]);
                assert.deepEqual(minmax('1'), [1, 1]);
                assert.deepEqual(minmax('Infinity'), [Infinity, Infinity]);
                assert.deepEqual(minmax('-Infinity'), [-Infinity, -Infinity]);
                assert.deepEqual(minmax('42'), [42, 42]);
                assert.deepEqual(minmax('.0'), [.0, .0]);
                assert.deepEqual(minmax('1.1'), [1.1, 1.1]);
                assert.deepEqual(minmax('.01'), [.01, .01]);
                assert.deepEqual(minmax('1.01'), [1.01, 1.01]);
                assert.deepEqual(minmax('1e5'), [1e5, 1e5]);
                assert.deepEqual(minmax('-1e-5'), [-1e-5, -1e-5]);
                assert.deepEqual(minmax('-.1e-5'), [-.1e-5, -.1e-5]);
        });

        QUnit.test('minmax правильно парсит несколько чисел', function (assert) {
                assert.deepEqual(minmax('0 0 0 0'), [0, 0]);
                assert.deepEqual(minmax('1 1 1 1'), [1, 1]);
                assert.deepEqual(minmax('1 2 3 4'), [1, 4]);
                assert.deepEqual(minmax('-Infinity -1 0 1 Infinity'), [-Infinity, Infinity]);
                assert.deepEqual(minmax('-.01 0 .01'), [-.01, .01]);
        });

        QUnit.test('minmax игнорирует обычный текст', function (assert) {
                assert.deepEqual(minmax('1, -5.8 или 10, хотя 34 + -5.3 и 73'), [-5.8, 73]);
        });

        QUnit.test('minmax правильно работает со строками, содержащими пробелы в начале и в конце', function (assert) {
                assert.deepEqual(minmax('   12 -.123 Infinity     '), [-.123, Infinity]);
                assert.deepEqual(minmax('           12 -.12334'), [-.12334, 12]);
        });

        QUnit.test('minmax правильно работает со строками, содержащими только пробелы', function (assert) {
                assert.deepEqual(minmax('         '), [undefined, undefined]);
        });

        QUnit.test('minmax правильно работает со строками, содержащими спецсимволы', function (assert) {
                assert.deepEqual(minmax('1 2 РП3 4'), [1, 4]);
                assert.deepEqual(minmax('-Infinity йцуу'), [-Infinity, -Infinity]);
        });

        QUnit.test('minmax правильно работает со строками, содержащими пробелы между числами', function (assert) {
                assert.deepEqual(minmax('12         -.123    Infinity'), [-.123, Infinity]);
                assert.deepEqual(minmax('12   -.12334'), [-.12334, 12]);
        });

        QUnit.test('minmax правильно работает с данными отличными от строк', function (assert) {
                assert.throws(function () {
                    minmax(123);
                }, TypeError);
                assert.throws(function () {
                    minmax(false);
                }, TypeError);
                assert.throws(function () {
                    minmax();
                }, TypeError);
        });

        QUnit.test('minmax правильно работает с объектом-обёрткой', function (assert) {
                assert.deepEqual(minmax(new String('4 5 6')), [4, 6]);
                assert.deepEqual(minmax(new String('aaaaaaa')), [undefined, undefined]);
        });
});
