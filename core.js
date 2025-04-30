/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ts-md5/dist/esm/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Md5: () => (/* reexport safe */ _md5__WEBPACK_IMPORTED_MODULE_0__.Md5),
/* harmony export */   Md5FileHasher: () => (/* reexport safe */ _md5_file_hasher__WEBPACK_IMPORTED_MODULE_1__.Md5FileHasher),
/* harmony export */   ParallelHasher: () => (/* reexport safe */ _parallel_hasher__WEBPACK_IMPORTED_MODULE_2__.ParallelHasher)
/* harmony export */ });
/* harmony import */ var _md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./md5 */ "./node_modules/ts-md5/dist/esm/md5.js");
/* harmony import */ var _md5_file_hasher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5_file_hasher */ "./node_modules/ts-md5/dist/esm/md5_file_hasher.js");
/* harmony import */ var _parallel_hasher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parallel_hasher */ "./node_modules/ts-md5/dist/esm/parallel_hasher.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ts-md5/dist/esm/md5.js":
/*!*********************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/md5.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Md5: () => (/* binding */ Md5)
/* harmony export */ });
/*

TypeScript Md5
==============

Based on work by
* Joseph Myers: http://www.myersdaily.org/joseph/javascript/md5-text.html
* André Cruz: https://github.com/satazor/SparkMD5
* Raymond Hill: https://github.com/gorhill/yamd5.js

Effectively a TypeScrypt re-write of Raymond Hill JS Library

The MIT License (MIT)

Copyright (C) 2014 Raymond Hill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



            DO WHAT YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2015 André Cruz <amdfcruz@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT YOU WANT TO.


*/
;
class Md5 {
    constructor() {
        this._dataLength = 0;
        this._bufferLength = 0;
        this._state = new Int32Array(4);
        this._buffer = new ArrayBuffer(68);
        this._buffer8 = new Uint8Array(this._buffer, 0, 68);
        this._buffer32 = new Uint32Array(this._buffer, 0, 17);
        this.start();
    }
    static hashStr(str, raw = false) {
        return this.onePassHasher
            .start()
            .appendStr(str)
            .end(raw);
    }
    static hashAsciiStr(str, raw = false) {
        return this.onePassHasher
            .start()
            .appendAsciiStr(str)
            .end(raw);
    }
    static _hex(x) {
        const hc = Md5.hexChars;
        const ho = Md5.hexOut;
        let n;
        let offset;
        let j;
        let i;
        for (i = 0; i < 4; i += 1) {
            offset = i * 8;
            n = x[i];
            for (j = 0; j < 8; j += 2) {
                ho[offset + 1 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
                ho[offset + 0 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
            }
        }
        return ho.join('');
    }
    static _md5cycle(x, k) {
        let a = x[0];
        let b = x[1];
        let c = x[2];
        let d = x[3];
        // ff()
        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        // gg()
        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        // hh()
        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        // ii()
        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }
    /**
     * Initialise buffer to be hashed
     */
    start() {
        this._dataLength = 0;
        this._bufferLength = 0;
        this._state.set(Md5.stateIdentity);
        return this;
    }
    // Char to code point to to array conversion:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
    /**
     * Append a UTF-8 string to the hash buffer
     * @param str String to append
     */
    appendStr(str) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let code;
        let i;
        for (i = 0; i < str.length; i += 1) {
            code = str.charCodeAt(i);
            if (code < 128) {
                buf8[bufLen++] = code;
            }
            else if (code < 0x800) {
                buf8[bufLen++] = (code >>> 6) + 0xC0;
                buf8[bufLen++] = code & 0x3F | 0x80;
            }
            else if (code < 0xD800 || code > 0xDBFF) {
                buf8[bufLen++] = (code >>> 12) + 0xE0;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            else {
                code = ((code - 0xD800) * 0x400) + (str.charCodeAt(++i) - 0xDC00) + 0x10000;
                if (code > 0x10FFFF) {
                    throw new Error('Unicode standard supports code points up to U+10FFFF');
                }
                buf8[bufLen++] = (code >>> 18) + 0xF0;
                buf8[bufLen++] = (code >>> 12 & 0x3F) | 0x80;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            if (bufLen >= 64) {
                this._dataLength += 64;
                Md5._md5cycle(this._state, buf32);
                bufLen -= 64;
                buf32[0] = buf32[16];
            }
        }
        this._bufferLength = bufLen;
        return this;
    }
    /**
     * Append an ASCII string to the hash buffer
     * @param str String to append
     */
    appendAsciiStr(str) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let i;
        let j = 0;
        for (;;) {
            i = Math.min(str.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = str.charCodeAt(j++);
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    }
    /**
     * Append a byte array to the hash buffer
     * @param input array to append
     */
    appendByteArray(input) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let i;
        let j = 0;
        for (;;) {
            i = Math.min(input.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = input[j++];
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    }
    /**
     * Get the state of the hash buffer
     */
    getState() {
        const s = this._state;
        return {
            buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
            buflen: this._bufferLength,
            length: this._dataLength,
            state: [s[0], s[1], s[2], s[3]]
        };
    }
    /**
     * Override the current state of the hash buffer
     * @param state New hash buffer state
     */
    setState(state) {
        const buf = state.buffer;
        const x = state.state;
        const s = this._state;
        let i;
        this._dataLength = state.length;
        this._bufferLength = state.buflen;
        s[0] = x[0];
        s[1] = x[1];
        s[2] = x[2];
        s[3] = x[3];
        for (i = 0; i < buf.length; i += 1) {
            this._buffer8[i] = buf.charCodeAt(i);
        }
    }
    /**
     * Hash the current state of the hash buffer and return the result
     * @param raw Whether to return the value as an `Int32Array`
     */
    end(raw = false) {
        const bufLen = this._bufferLength;
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        const i = (bufLen >> 2) + 1;
        this._dataLength += bufLen;
        const dataBitsLen = this._dataLength * 8;
        buf8[bufLen] = 0x80;
        buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
        buf32.set(Md5.buffer32Identity.subarray(i), i);
        if (bufLen > 55) {
            Md5._md5cycle(this._state, buf32);
            buf32.set(Md5.buffer32Identity);
        }
        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        if (dataBitsLen <= 0xFFFFFFFF) {
            buf32[14] = dataBitsLen;
        }
        else {
            const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
            if (matches === null) {
                return;
            }
            const lo = parseInt(matches[2], 16);
            const hi = parseInt(matches[1], 16) || 0;
            buf32[14] = lo;
            buf32[15] = hi;
        }
        Md5._md5cycle(this._state, buf32);
        return raw ? this._state : Md5._hex(this._state);
    }
}
// Private Static Variables
Md5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
Md5.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
Md5.hexChars = '0123456789abcdef';
Md5.hexOut = [];
// Permanent instance is to use for one-call hashing
Md5.onePassHasher = new Md5();
if (Md5.hashStr('hello') !== '5d41402abc4b2a76b9719d911017c592') {
    throw new Error('Md5 self test failed.');
}
//# sourceMappingURL=md5.js.map

/***/ }),

/***/ "./node_modules/ts-md5/dist/esm/md5_file_hasher.js":
/*!*********************************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/md5_file_hasher.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Md5FileHasher: () => (/* binding */ Md5FileHasher)
/* harmony export */ });
/* harmony import */ var _md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./md5 */ "./node_modules/ts-md5/dist/esm/md5.js");

// Hashes any blob
class Md5FileHasher {
    constructor(_callback, // Callback to return the result
    _async = true, // Async version is not always available in a web worker
    _partSize = 1048576) {
        this._callback = _callback;
        this._async = _async;
        this._partSize = _partSize;
        this._configureReader();
    }
    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     */
    hash(blob) {
        const self = this;
        self._blob = blob;
        // self._length = Math.ceil(blob.size / self._partSize);
        self._part = 0;
        self._md5 = new _md5__WEBPACK_IMPORTED_MODULE_0__.Md5();
        self._processPart();
    }
    _fail() {
        this._callback({
            success: false,
            result: 'data read failed'
        });
    }
    _hashData(e) {
        let self = this;
        self._md5.appendByteArray(new Uint8Array(e.target.result));
        if (self._part * self._partSize >= self._blob.size) {
            self._callback({
                success: true,
                result: self._md5.end()
            });
        }
        else {
            self._processPart();
        }
    }
    _processPart() {
        const self = this;
        let endbyte = 0;
        let current_part;
        self._part += 1;
        if (self._blob.size > self._partSize) { // If blob bigger then part_size we will slice it up
            endbyte = self._part * self._partSize;
            if (endbyte > self._blob.size) {
                endbyte = self._blob.size;
            }
            current_part = self._blob.slice((self._part - 1) * self._partSize, endbyte);
        }
        else {
            current_part = self._blob;
        }
        if (self._async) {
            self._reader.readAsArrayBuffer(current_part);
        }
        else {
            setTimeout(() => {
                try {
                    self._hashData({
                        target: {
                            result: self._reader.readAsArrayBuffer(current_part)
                        },
                    });
                }
                catch (e) {
                    self._fail();
                }
            }, 0);
        }
    }
    _configureReader() {
        const self = this;
        if (self._async) {
            self._reader = new FileReader();
            self._reader.onload = self._hashData.bind(self);
            self._reader.onerror = self._fail.bind(self);
            self._reader.onabort = self._fail.bind(self);
        }
        else {
            self._reader = new FileReaderSync();
        }
    }
}
//# sourceMappingURL=md5_file_hasher.js.map

/***/ }),

/***/ "./node_modules/ts-md5/dist/esm/parallel_hasher.js":
/*!*********************************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/parallel_hasher.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParallelHasher: () => (/* binding */ ParallelHasher)
/* harmony export */ });
;
class ParallelHasher {
    constructor(workerUri, workerOptions) {
        this._queue = [];
        this._ready = true;
        const self = this;
        if (Worker) {
            self._hashWorker = new Worker(workerUri, workerOptions);
            self._hashWorker.onmessage = self._recievedMessage.bind(self);
            self._hashWorker.onerror = (err) => {
                self._ready = false;
                console.error('Hash worker failure', err);
            };
        }
        else {
            self._ready = false;
            console.error('Web Workers are not supported in this browser');
        }
    }
    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     * @returns Promise of the Hashed result
     */
    hash(blob) {
        const self = this;
        let promise;
        promise = new Promise((resolve, reject) => {
            self._queue.push({
                blob,
                resolve,
                reject,
            });
            self._processNext();
        });
        return promise;
    }
    /** Terminate any existing hash requests */
    terminate() {
        this._ready = false;
        this._hashWorker.terminate();
    }
    // Processes the next item in the queue
    _processNext() {
        if (this._ready && !this._processing && this._queue.length > 0) {
            this._processing = this._queue.pop();
            this._hashWorker.postMessage(this._processing.blob);
        }
    }
    // Hash result is returned from the worker
    _recievedMessage(evt) {
        var _a, _b;
        const data = evt.data;
        if (data.success) {
            (_a = this._processing) === null || _a === void 0 ? void 0 : _a.resolve(data.result);
        }
        else {
            (_b = this._processing) === null || _b === void 0 ? void 0 : _b.reject(data.result);
        }
        this._processing = undefined;
        this._processNext();
    }
}
//# sourceMappingURL=parallel_hasher.js.map

/***/ }),

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Engine)
/* harmony export */ });
/* harmony import */ var _engine_animations_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/animations/animations */ "./src/engine/animations/animations.ts");
/* harmony import */ var _engine_utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/utils/utils */ "./src/engine/utils/utils.ts");
/* harmony import */ var _engine_crypto_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine/crypto/crypto */ "./src/engine/crypto/crypto.ts");
/* harmony import */ var _engine_server_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./engine/server/server */ "./src/engine/server/server.ts");
/* harmony import */ var _engine_scene_scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./engine/scene/scene */ "./src/engine/scene/scene.ts");
//VLADYSLAV TOLMACHOV 12/23
//Тут будут расписаны основные функции движка





class Engine {
    constructor() {
        this.FPS = 50;
        this.crypto = new _engine_crypto_crypto__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.utils = new _engine_utils_utils__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.anims = new _engine_animations_animations__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.server = new _engine_server_server__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.scene = new _engine_scene_scene__WEBPACK_IMPORTED_MODULE_4__["default"]();
        //this.sayHello();
    }
    sayHello() {
        console.log('%c%s', 'font-weight: bold; font-size: 15px', 'Tolmasoft Engine 5.0.3 beta');
        console.log('This project work with PixiJS 7 (https://github.com/pixijs/pixijs)');
    }
}


/***/ }),

/***/ "./src/engine/animations/animations.ts":
/*!*********************************************!*\
  !*** ./src/engine/animations/animations.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSAnims)
/* harmony export */ });
/* harmony import */ var _fade_anims__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fade-anims */ "./src/engine/animations/fade-anims.ts");
/* harmony import */ var _mask_anims__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mask-anims */ "./src/engine/animations/mask-anims.ts");
/* harmony import */ var _text_anims__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-anims */ "./src/engine/animations/text-anims.ts");



class TSAnims {
    constructor() {
        this.text = new _text_anims__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.fade = new _fade_anims__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.mask = new _mask_anims__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
}


/***/ }),

/***/ "./src/engine/animations/fade-anims.ts":
/*!*********************************************!*\
  !*** ./src/engine/animations/fade-anims.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSFadeAnims)
/* harmony export */ });
class TSFadeAnims {
    constructor() {
    }
    fadeIn(DO, time = 100, callback = () => { }, easing = window.engine.utils.numbers.Easing.linear) {
        this.fade(DO, 1, time, callback, easing);
        console.warn('fadeIn() is deprecated. Use fade(DO, 1, time, callback) since 5.0.2');
    }
    fadeOut(DO, time = 100, callback = () => { }, easing = window.engine.utils.numbers.Easing.linear) {
        this.fade(DO, 0, time, callback, easing);
        console.warn('fadeOut() is deprecated. Use fade(DO, 0, time, callback) since 5.0.2');
    }
    fade(DO, to = 1, duration = 100, callback = () => { }, easing = window.engine.utils.numbers.Easing.linear) {
        if (Math.abs(DO.alpha - to) < 0.001) {
            callback();
            return;
        }
        const start = performance.now();
        const from = DO.alpha;
        const diff = to - from;
        DO._animstart = start;
        // адаптивное время, как у тебя:
        duration *= Math.max(1, Math.abs(diff));
        DO.anim_func = () => {
            if (DO._animstart !== start)
                return;
            const now = performance.now();
            let percent = easing(Math.min(1, (now - start) / duration));
            DO.alpha = from + diff * percent;
            if ((diff > 0 && DO.alpha < to) || (diff < 0 && DO.alpha > to)) {
                requestAnimationFrame(DO.anim_func);
            }
            else if (DO.alpha === to) {
                DO.alpha = to;
                DO.anim_func = undefined;
                callback();
            }
        };
        requestAnimationFrame(DO.anim_func);
    }
    blink(DO, times = 1, duration = 100, callback = () => { }, easing = window.engine.utils.numbers.Easing.linear) {
        if (!DO || times <= 0)
            return callback();
        const half = duration / 2;
        let count = 0;
        const blinkOnce = () => {
            this.fade(DO, 0, half, () => {
                this.fade(DO, 1, half, () => {
                    count++;
                    if (count < times) {
                        blinkOnce(); // повтор
                    }
                    else {
                        callback(); // завершено
                    }
                }, easing);
            }, easing);
        };
        blinkOnce();
    }
}


/***/ }),

/***/ "./src/engine/animations/mask-anims.ts":
/*!*********************************************!*\
  !*** ./src/engine/animations/mask-anims.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSMaskAnims)
/* harmony export */ });
class TSMaskAnims {
    constructor() {
        this.diameter = 30;
        this.draw_coef = 15;
        this.trig = false;
        this.diag_coef = this.diameter - this.diameter / Math.PI;
    }
    scratch(movie, time = 1000) {
        if (!this.all_points.length || this.trig)
            this.countPointsDiag();
        let masker = new window.PIXI.Graphics();
        let ii = 0;
        let counter = Math.ceil(this.all_points.length / time);
        movie.mask = masker;
        movie.masker_anim = () => {
            if (ii == time) {
                masker.clear();
                movie.mask = null;
            }
            else {
                for (let i = ii * counter; i < (ii + 1) * counter && i < this.all_points.length; i++) {
                    window.engine.scene.UI.Graphics.circle(this.all_points[i].x - this.diameter / 2, this.all_points[i].y - this.diameter / 2, this.diameter, masker);
                }
                ii++;
                requestAnimationFrame(movie.masker_anim);
            }
        };
        requestAnimationFrame(movie.masker_anim);
    }
    countPointsDiag(start = 7) {
        start == 7 ? this.trig = false : this.trig = true;
        let mir_points = [];
        let a = window.app.renderer.height;
        let b = window.app.renderer.width;
        let big_c = Math.ceil(Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2)));
        let alpha = Math.atan(a / b);
        let beta = Math.atan(b / a);
        let count_diag = Math.ceil(big_c / this.diag_coef);
        let direct = false;
        for (let i = start; i < Math.ceil(count_diag / 2); i++) {
            let little_a = (i + 1) * this.diag_coef;
            let y_dir = Math.min(a, Math.floor(little_a / Math.cos(beta))); //отступ по y
            let x_dir = Math.min(b, Math.floor(little_a / Math.cos(alpha))); //отступ по x
            let little_c = Math.ceil(Math.sqrt(Math.pow(y_dir, 2) + Math.pow(x_dir, 2))); //гипотенуза. т.е. виртуальная  диагональ по которой рисуем
            let count_c = Math.ceil(little_c / this.draw_coef);
            for (let ii = 0; ii < count_c; ii++) {
                let normal_x, normal_y, mir_x, mir_y;
                if (direct) {
                    normal_x = b - x_dir * (ii / count_c);
                    normal_y = y_dir - y_dir * (ii / count_c);
                }
                else {
                    normal_x = (b - x_dir) + x_dir * (ii / count_c);
                    normal_y = y_dir * (ii / count_c);
                }
                if ((count_diag % 2) / Number(direct)) {
                    mir_x = x_dir - x_dir * (ii / count_c);
                    mir_y = a - y_dir * (ii / count_c);
                }
                else {
                    mir_x = x_dir * (ii / count_c);
                    mir_y = (a - y_dir) + y_dir * (ii / count_c);
                }
                this.all_points.push({ x: normal_x, y: normal_y });
                mir_points.unshift({ x: mir_x, y: mir_y });
            }
            direct = !direct;
        }
        this.all_points = this.all_points.concat(mir_points);
    }
}


/***/ }),

/***/ "./src/engine/animations/text-anims.ts":
/*!*********************************************!*\
  !*** ./src/engine/animations/text-anims.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSTextAnims)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/engine/utils/utils.ts");

class TSTextAnims {
    constructor() {
    }
    prettyCounter(textfield, value, time, callback = () => { }) {
        if (typeof value !== "number" || isNaN(value))
            return;
        if (!window.engine.utils)
            window.engine.utils = new _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"](); //ОБЯЗАТЕЛЬНО. Т.к. если не инициализированы утилиты, то не будет работать анимация
        let start = performance.now();
        let old_value = window.engine.utils.numbers.realNumber(textfield.text);
        let diff = value - old_value;
        let percent = 0;
        textfield._animstart = start; //время используется как идентификатор анимации
        textfield._oldval = old_value;
        textfield.anim_func = () => {
            if (start !== textfield._animstart)
                return; //если время старта не совпадает с нужным
            percent = window.engine.utils.numbers.Easing.easeOutQuad(Math.min(1, (performance.now() - start) / time)); //на всякий случай чтобы не было более 100%
            let newval = Math.floor(old_value + diff * percent);
            if (textfield._oldval !== newval) { //если за кадр число не поменялось
                textfield.text = window.engine.utils.numbers.prettyNumber(newval); //floor нужен чтобы не было дробных чисел
            }
            if (percent >= 1) {
                if (value !== newval)
                    textfield.text = window.engine.utils.numbers.prettyNumber(value); //если анимация кончилась
                textfield.anim_func = undefined; //уничтожаем функцию
                callback();
            }
            else {
                requestAnimationFrame(textfield.anim_func);
            }
            textfield._oldval = newval; //пишем новое число чтобы лишний раз не перерисовывать текст
        };
        requestAnimationFrame(textfield.anim_func);
    }
    shortCounter(textfield, value, time, callback = () => { }) {
        if (typeof value !== "number" || isNaN(value))
            return;
        if (!window.engine.utils)
            window.engine.utils = new _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"](); //ОБЯЗАТЕЛЬНО. Т.к. если не инициализированы утилиты, то не будет работать анимация
        let start = performance.now();
        let old_value = window.engine.utils.numbers.fullNumber(textfield.text);
        let diff = value - old_value;
        let percent = 0;
        textfield._animstart = start;
        textfield._oldval = old_value;
        textfield.anim_func = () => {
            if (start !== textfield._animstart)
                return;
            percent = window.engine.utils.numbers.Easing.easeOutQuad(Math.min(1, (performance.now() - start) / time));
            let newval = Math.floor(old_value + diff * percent);
            if (textfield._oldval !== newval) {
                textfield.text = window.engine.utils.numbers.shortNumber(newval); //floor нужен чтобы не было дробных чисел}
            }
            if (percent >= 1) {
                if (value !== newval)
                    textfield.text = window.engine.utils.numbers.shortNumber(value);
                textfield.anim_func = undefined;
                callback();
            }
            else {
                requestAnimationFrame(textfield.anim_func);
            }
            textfield._oldval = newval;
        };
        requestAnimationFrame(textfield.anim_func);
    }
}


/***/ }),

/***/ "./src/engine/crypto/base64.ts":
/*!*************************************!*\
  !*** ./src/engine/crypto/base64.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSBase64)
/* harmony export */ });
class TSBase64 {
    constructor() {
    }
    encode(text) {
        const utf8 = new TextEncoder().encode(text);
        const binary = Array.from(utf8).map(b => String.fromCharCode(b)).join('');
        return btoa(binary);
    }
    decode(text) {
        try {
            const binary = atob(text);
            const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
            return new TextDecoder().decode(bytes);
        }
        catch (e) {
            return text;
        }
    }
}


/***/ }),

/***/ "./src/engine/crypto/crypto.ts":
/*!*************************************!*\
  !*** ./src/engine/crypto/crypto.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSCrypto)
/* harmony export */ });
/* harmony import */ var ts_md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-md5 */ "./node_modules/ts-md5/dist/esm/index.js");
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base64 */ "./src/engine/crypto/base64.ts");


class TSCrypto {
    constructor() {
        this.md5 = ts_md5__WEBPACK_IMPORTED_MODULE_0__.Md5;
        this.base64 = new _base64__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.rsa = new JSEncrypt();
        this.rsa.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCu2Z3wdMyNQ9h9m9Q9XLJnMMiK
3GidyyKWRA2x1XEyp8/KGAdPoLGbD8BsV/llq8lX3Zzh6SN6hjKF8zdloC8Bjoiu
hR36Yrvp1dxdYLHFcrJbOQ2f6UcVOanvY42sZ1p6tuOiYgjNOgcb6x61A/SJTGF/
uf/WTrTBRZ+D2oJV9QIDAQAB
-----END PUBLIC KEY-----`);
    }
}


/***/ }),

/***/ "./src/engine/scene/scene.ts":
/*!***********************************!*\
  !*** ./src/engine/scene/scene.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSScene)
/* harmony export */ });
/* harmony import */ var _ui_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/ui */ "./src/engine/scene/ui/ui.ts");
/*
VLADYSLAV TOLMACHOV 2025
*/

class TSScene {
    constructor() {
        this.setups = {};
        this._type_handlers = {
            Container: this.setupContainer.bind(this),
            Sprite: this.setupSprite.bind(this),
            Button: this.setupButton.bind(this),
            Sequence: this.setupSequence.bind(this),
            Graphics: this.setupGraphics.bind(this),
            Animation: this.setupAnimation.bind(this),
            Text: this.setupText.bind(this),
            TextInput: this.setupTextInput.bind(this),
            DropDown: this.setupDropDown.bind(this),
            ScrollBox: this.setupScrollBox.bind(this),
            CheckBox: this.setupCheckBox.bind(this),
        };
        this._graphic_handlers = {
            rect: (params, obj) => {
                return this.UI.Graphics.rect(params[0] * window.devicePixelRatio, params[1] * window.devicePixelRatio, params[2] * window.devicePixelRatio, params[3] * window.devicePixelRatio, params[4] || 0xffffff, obj);
            },
            circle: (params, obj) => {
                return this.UI.Graphics.circle(params[0] * window.devicePixelRatio, params[1] * window.devicePixelRatio, params[2] * window.devicePixelRatio, obj);
            },
            // сюда легко потом добавить ellipse, polygon и так далее
        };
        this._def_params = {
            position: { x: 0, y: 0, alpha: 1, visible: true, scale: 1, rotation: 0 },
            masker: [],
        };
        //private _def_params_text: any = {default: '', style: { }, animation: 'none', align: 0 }
        //private _def_params_dd: any = { animation: 'none', length: 0, names: [] }
        this._type_specific_defaults = {
            DropDown: {
                config: {
                    animation: 'none',
                    length: 0,
                    names: []
                }
            },
            Text: {
                default: '',
                style: {},
                animation: 'none',
                align: 0
            },
            TextInput: {
                default: '',
                style: {},
                animation: 'none',
                align: 0
            },
            ScrollBox: {
                config: {
                    snap: 50,
                    width: 300,
                    height: 300,
                    type: 0
                }
            },
            CheckBox: {
                config: {
                    status: false,
                    border: false,
                    discheck: false
                }
            }
        };
        this.UI = new _ui_ui__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.textures = {};
    }
    //Как работает сетуп: просто проходмся по всем интересующим объектам из бандла. Если они явно не указаны, ТО грузим то, что в setup.json указано как основные дисплей объекты
    setup(bundle_id, objects = false) {
        let setup_data = this.setups[bundle_id];
        if (this.textures[bundle_id] == undefined || !setup_data)
            return;
        if (!objects)
            objects = setup_data.setup; //тут проверяем если не указано явно что грузить - грузим основные display_objects
        const output = Object.fromEntries(objects.map((name) => [name, this.identifySetup(bundle_id, setup_data, name)]));
        return output; //на выходе уже красивый массив с ключами по именам objects или основных display_objects
    }
    identifySetup(bundle_id, setup_data, name) {
        let obj = window.engine.utils.factory.createContainer();
        console.log(name);
        let cur_item = setup_data['display_objects'][name];
        if (!Boolean(cur_item)) {
            console.warn('Not found object: ' + name);
            return obj;
        }
        for (let key in this._def_params)
            cur_item[key] = { ...this._def_params[key], ...cur_item[key] };
        const type = cur_item.type;
        if (this._type_specific_defaults[type]) {
            const specific = this._type_specific_defaults[type];
            for (let key in specific) {
                // если cur_item[key] уже есть — мержим, иначе просто вставляем дефолт
                if (typeof specific[key] === 'object' && specific[key] !== null) {
                    cur_item[key] = { ...specific[key], ...(cur_item[key] ?? {}) };
                }
                else if (cur_item[key] === undefined) {
                    cur_item[key] = specific[key];
                }
            }
        }
        const handler = this._type_handlers[type];
        if (!handler) {
            console.warn(`Unknown DisplayObject type: ${cur_item.type}`);
            return window.engine.utils.factory.createContainer();
        }
        obj = handler(bundle_id, setup_data, name);
        //Сервисные данные. Фактически могут не пригодиться
        obj.bundle_id = bundle_id;
        obj.setup_name = name;
        obj.setup_data = setup_data; //Это ссылочные данные. Ведут к основному сетупу
        this.applyBaseParams(obj, cur_item);
        obj.copy = () => { return this.identifySetup(bundle_id, setup_data, name); };
        return obj;
    }
    applyBaseParams(obj, cur_item) {
        const pos = cur_item.position;
        obj.x = pos.x * window.devicePixelRatio;
        obj.y = pos.y * window.devicePixelRatio;
        obj.scale.set(pos.scale * window.devicePixelRatio);
        obj.visible = pos.visible;
        obj.alpha = pos.alpha;
        if (cur_item['masker'][0]) {
            window.engine.utils.factory.setMask(obj, this.parseGraphic(cur_item.masker));
        }
    }
    setupContainer(bundle_id, setup_data, name) {
        let obj = window.engine.utils.factory.createContainer();
        for (let i = 0; i < setup_data['display_objects'][name]['texture'].length; i++) {
            let texture_name = setup_data['display_objects'][name]['texture'][i];
            let cut_name = window.engine.utils.getShortName(setup_data['display_objects'][name]['texture'][i]);
            obj[cut_name] = this.identifySetup(bundle_id, setup_data, texture_name);
            obj.addChild(obj[cut_name]);
            if (obj[cut_name].mask && obj[cut_name].parent)
                obj[cut_name].parent.addChild(obj[cut_name].mask);
        }
        return obj;
    }
    setupSprite(bundle_id, setup_data, name) {
        let alias_id = this.searchAlias(bundle_id, setup_data['display_objects'][name]['texture']);
        let texture_name = setup_data['display_objects'][name]['texture'];
        let obj = window.engine.utils.factory.createContainer();
        if (Boolean(this.textures[bundle_id][alias_id]['textures'][texture_name])) {
            obj = window.engine.utils.factory.createSprite(this.textures[bundle_id][alias_id]['textures'][texture_name]);
        }
        else {
            console.warn('Texture ' + texture_name + ' not found. Please check your setup file and atlas.');
        }
        obj.alias = alias_id;
        return obj;
    }
    setupButton(bundle_id, setup_data, name) {
        let display_objects = [];
        for (let i = 0; i < setup_data['display_objects'][name]['texture'].length; i++) {
            display_objects.push(this.identifySetup(bundle_id, setup_data, setup_data['display_objects'][name]['texture'][i]));
        }
        return new this.UI.Button(display_objects);
    }
    setupSequence(bundle_id, setup_data, name) {
        let display_objects = [];
        for (let i = 0; i < setup_data['display_objects'][name]['texture'].length; i++) {
            display_objects.push(this.identifySetup(bundle_id, setup_data, setup_data['display_objects'][name]['texture'][i]));
        }
        return new this.UI.Sequence(display_objects, setup_data['display_objects'][name]);
    }
    setupGraphics(bundle_id, setup_data, name) {
        let obj = window.engine.utils.factory.createGraphics();
        obj.cacheAsBitmap = true;
        obj = this.parseGraphic(setup_data['display_objects'][name]['texture'], obj);
        return obj;
    }
    setupAnimation(bundle_id, setup_data, name) {
        let obj = new window.PIXI.spine.Spine(this.textures[bundle_id][setup_data['display_objects'][name].texture].spineData);
        setup_data['display_objects'][name].mixes = setup_data['display_objects'][name].mixes || [];
        let mixes = setup_data['display_objects'][name].mixes;
        for (let i = 0; i < mixes.length; i++) {
            obj.stateData.setMix(mixes[i][0], mixes[i][1], mixes[i][2]);
        }
        obj.state.setAnimation(0, setup_data['display_objects'][name].default || '', true);
        return obj;
    }
    setupText(bundle_id, setup_data, name) {
        //setup_data['display_objects'][name] = { ...this._def_params_text, ...setup_data['display_objects'][name] };
        let style = setup_data['display_objects'][name].style;
        if (!style.resolution) {
            style.resolution = window.devicePixelRatio;
        }
        let text = new window.PIXI.Text(setup_data['display_objects'][name].default, style);
        text.anim_type = setup_data['display_objects'][name].animation;
        text.anchor.x = setup_data['display_objects'][name].align;
        text.style.align = this.transformAligh(setup_data['display_objects'][name].align);
        return text;
    }
    setupTextInput(bundle_id, setup_data, name) {
        //setup_data['display_objects'][name] = { ...this._def_params_text, ...setup_data['display_objects'][name] };
        if (!setup_data['display_objects'][name].style.resolution) {
            setup_data['display_objects'][name].style.resolution = window.devicePixelRatio;
        }
        let textinput = new this.UI.TextInput({
            input: setup_data['display_objects'][name].style
        });
        textinput.placeholder = setup_data['display_objects'][name].default;
        return textinput;
    }
    setupDropDown(bundle_id, setup_data, name) {
        let display_objects = [];
        for (let i = 0; i < setup_data['display_objects'][name]['texture'].length; i++) {
            display_objects.push(this.identifySetup(bundle_id, setup_data, setup_data['display_objects'][name]['texture'][i]));
        }
        //setup_data['display_objects'][name]['config'] = setup_data['display_objects'][name]['config'] || {};
        //setup_data['display_objects'][name]['config'] = {...this._def_params_dd, ...setup_data['display_objects'][name]['config'] };
        return new this.UI.DropDown(display_objects, setup_data['display_objects'][name]['config']);
    }
    setupCheckBox(bundle_id, setup_data, name) {
        let display_objects = [];
        for (let i = 0; i < setup_data['display_objects'][name]['texture'].length; i++) {
            display_objects.push(this.identifySetup(bundle_id, setup_data, setup_data['display_objects'][name]['texture'][i]));
        }
        return new this.UI.CheckBox(display_objects, setup_data['display_objects'][name]['config']);
    }
    setupScrollBox(bundle_id, setup_data, name) {
        let display_objects = [];
        for (let i = 0; i < setup_data['display_objects'][name]['texture'].length; i++) {
            display_objects.push(this.identifySetup(bundle_id, setup_data, setup_data['display_objects'][name]['texture'][i]));
        }
        return new this.UI.ScrollBox(display_objects, setup_data['display_objects'][name]['config']);
    }
    //SERVICE FUNCTIONS
    loadBundle(name, callback = false) {
        window.PIXI.Assets.loadBundle(name)
            .then((respomse) => {
            if (respomse == undefined) {
                if (callback)
                    callback(false);
                return;
            }
            this.textures[name] = respomse;
            if (callback)
                callback(respomse);
        });
    }
    searchAlias(bundle_id, name) {
        let alias = 'none';
        for (let key in window.engine.scene.textures[bundle_id]) {
            for (let subkey in window.engine.scene.textures[bundle_id][key].textures) {
                if (subkey == name)
                    return key;
            }
        }
        return alias;
    }
    parseGraphic(parts, obj = window.engine.utils.factory.createGraphics()) {
        for (const key in parts) {
            const part = parts[key];
            const type = part[0];
            const handler = this._graphic_handlers[type];
            if (handler) {
                handler(part.slice(1), obj); // вызываем, но НЕ перезаписываем obj
            }
            else {
                console.warn(`Unknown graphic type: ${type}`);
            }
        }
        return obj;
    }
    transformAligh(num) {
        let str = '';
        switch (num) {
            case 0:
                str = 'left';
                break;
            case 1:
                str = 'right';
                break;
            default:
                str = 'center';
                break;
        }
        return str;
    }
}


/***/ }),

/***/ "./src/engine/scene/ui/button.ts":
/*!***************************************!*\
  !*** ./src/engine/scene/ui/button.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSButton)
/* harmony export */ });
/*
VLADYSLAV TOLMACHOV 2024
*/
class TSButton extends window.PIXI.Container {
    constructor(input_arr) {
        super();
        for (let key in input_arr)
            this[input_arr[key].setup_name.split("_").slice(-1)[0]] = input_arr[key];
        let def = input_arr[0];
        let act = input_arr[1] || false;
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.addChild(def);
        if (!Boolean(act))
            return;
        this.addChild(act);
        act.visible = false;
        let change = () => {
            act.visible = !act.visible;
            def.visible = !def.visible;
        };
        this.on('pointerover', change);
        this.on('pointerout', change);
    }
}


/***/ }),

/***/ "./src/engine/scene/ui/checkbox.ts":
/*!*****************************************!*\
  !*** ./src/engine/scene/ui/checkbox.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSCheckBox)
/* harmony export */ });
/*
VLADYSLAV TOLMACHOV 2025
*/
class TSCheckBox extends window.PIXI.Container {
    /*
        ОБЯЗАТЕЛЬНО: check
        НЕ ОБЯЗАТЕЛЬНО: discheck, border

        координаты и рабочую область определяем по border (если есть) или по check
    */
    constructor(displays, config) {
        super();
        this.callback = false;
        this._discheck = false;
        this._border = false;
        //config = Object.assign(, config);
        this.status = config.status;
        this._border = config.border ? displays[config.border] : window.engine.utils.factory.createContainer();
        this._discheck = config.discheck ? displays[config.discheck] : window.engine.utils.factory.createContainer();
        this._check = displays[0];
        let _act_button_config = config.border ? this._border : this._check;
        this.drawActButton(_act_button_config);
        this.addChild(this._border, this._check, this._discheck, this._act_button);
        this._act_button.on("pointertap", () => {
            this.status = !this.status;
            this.updateStatus();
        });
        this.updateStatus();
    }
    updateStatus() {
        this._check.visible = this.status;
        this._discheck.visible = !this.status;
        if (this.callback)
            this.callback();
    }
    addCallback(func) {
        console.warn('addCallback() is deprecated. Use setCallback() since 5.0.2');
        this.setCallback(func);
    }
    setCallback(func) {
        this.callback = func;
    }
    removeCallback() {
        this.callback = false;
    }
    drawActButton(config) {
        this._act_button = window.engine.scene.UI.Graphics.rect(0, 0, config.width, config.height);
        this._act_button.alpha = 0;
        window.engine.utils.factory.enableInteraction(this._act_button);
    }
    set(bool) {
        bool = Boolean(bool);
        if (this.status == bool)
            return;
        this.status = bool;
        this.updateStatus();
    }
    get() {
        return this.status;
    }
}


/***/ }),

/***/ "./src/engine/scene/ui/dropdown.ts":
/*!*****************************************!*\
  !*** ./src/engine/scene/ui/dropdown.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSDropDown)
/* harmony export */ });
/*
VLADYSLAV TOLMACHOV 2025
*/
class TSDropDown extends window.PIXI.Container {
    constructor(displays, config) {
        super();
        this.status = false; //true - слоты раскрыты, false закрыты
        this.callback = false;
        //config = { ...{ animation: 'none', length: 0, names: []}, ...config };//задаем базовый конфиг
        this.config = config;
        this.displays = displays;
        for (let key in this.displays)
            this[this.displays[key].setup_name.split('_').slice(-1)[0]] = this.displays[key];
        this.generate();
    }
    generate() {
        this.config.names.sort();
        //базовый конфиг: имена пунктов, тип анимации ЕСЛИ есть секвенция, то берем именно оттуда!
        if (this.displays[0].seq)
            this.config.names = window.engine.utils.json.copy(this.displays[0].seq.uids);
        if (!Boolean(this.config.names.length))
            return;
        while (this.children.length)
            this.children[0].destroy();
        this.box = new window.engine.scene.UI.ScrollBox([this.displays[1]], { snap: this.displays[1].height, width: this.displays[1].width, height: Boolean(this.config.length) ? this.displays[1].height * this.config.length : this.displays[1].height * (this.config.names.length - 1), type: 0 });
        this.box.y = this.displays[0].height;
        this.addChild(this.box);
        this.box.visible = false;
        for (let i = 0; i < this.config.names.length; i++) {
            let slot = false;
            if (i == 0) {
                slot = this.displays[i].copy();
                this.addChild(slot);
            }
            else {
                slot = this.box.getSlot();
                this.box.addItem(slot);
            }
            if (this.displays[0].seq)
                slot.seq.change(this.config.names[i]);
            if (!slot.btn)
                this.generateButton(slot);
            slot.btn.on('pointertap', () => this.tap(this.config.names[i]));
            this[this.config.names[i]] = slot;
        }
    }
    tap(index) {
        if (typeof (index) == 'string')
            index = this.config.names.indexOf(index);
        if (index || this.status)
            return this.change(index);
        this.status = true;
        //ВОЗМОЖНО так оно и останется и из конфига уберется пункт с анимациейну 
        switch (this.config['animation']) {
            case 'fade':
                break;
            default:
                this.defaultShow();
                break;
        }
    }
    generateButton(slot) {
        let btn = window.engine.scene.UI.Graphics.rect(0, 0, slot.width, slot.height);
        btn.eventMode = 'static';
        btn.cursor = 'pointer';
        btn.alpha = 0;
        slot.btn = btn;
        slot.addChild(slot.btn);
    }
    change(index) {
        this.status = false;
        this.box.visible = false;
        if (typeof (index) == 'string')
            index = this.config.names.indexOf(index);
        if (index <= 0)
            return; //ничего не делаем если просто нажали на главный слот
        let transit_main = {
            name: this.config.names[0],
            text: this[this.config.names[0]].tfd.text
        };
        let transit_sub = this[this.config.names[index]];
        //меняем все параметры из sub в main
        this[this.config.names[index]] = this[transit_main.name];
        this[this.config.names[index]].tfd.text = transit_sub.tfd.text;
        delete this[transit_main.name]; //удаляем связи
        //ставим все параметры из main в sub
        this[transit_main.name] = transit_sub;
        this[transit_main.name].tfd.text = transit_main.text;
        //меняем секвенцию если она существует
        if (this[this.config.names[0]].seq) {
            this[transit_main.name].seq.change(transit_main.name);
            this[this.config.names[index]].seq.change(this.config.names[index]);
        }
        window.engine.utils.json.swap(this.config.names, 0, index); //свапаем имена, чтобы корректно менялись слоты
        if (this.callback)
            this.callback({ index: index, name: this.config.names[0] });
        //this.sortNames();
    }
    sortNames() {
    }
    addCallback(func) {
        console.warn('addCallback() is deprecated. Use setCallback() since 5.0.2');
        this.setCallback(func);
    }
    setCallback(func) {
        this.callback = func;
    }
    removeCallback() {
        this.callback = false;
    }
    defaultShow() {
        this.box.visible = true;
    }
}


/***/ }),

/***/ "./src/engine/scene/ui/graphics.ts":
/*!*****************************************!*\
  !*** ./src/engine/scene/ui/graphics.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSGraphics)
/* harmony export */ });
class TSGraphics {
    constructor() {
    }
    circle(x, y, radius, grp = false) {
        let circle = grp ? grp : new window.PIXI.Graphics();
        if (window.engine.utils.detectPixiVersion() >= 8) {
            // Pixi 8: просто circle без fill
            circle.circle(x, y, radius);
        }
        else {
            // Pixi 7: старый способ
            circle
                .beginFill() // базовая заливка
                .drawCircle(x, y, radius)
                .endFill();
        }
        return circle;
    }
    rect(x, y, width, height, color = 0xffffff, grp = false) {
        let rect = grp ? grp : new window.PIXI.Graphics();
        console.log(color);
        color = color ?? 0xffffff;
        if (window.engine.utils.detectPixiVersion() >= 8) {
            // Pixi 8: рисуем rect и закрашиваем цветом
            rect.rect(x, y, width, height).fill({ color });
        }
        else {
            // Pixi 7: старый способ
            rect
                .beginFill(color)
                .drawRect(x, y, width, height)
                .endFill();
        }
        return rect;
    }
}


/***/ }),

/***/ "./src/engine/scene/ui/scrollbox.ts":
/*!******************************************!*\
  !*** ./src/engine/scene/ui/scrollbox.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSScrollBox)
/* harmony export */ });
/*
VLADYSLAV TOLMACHOV 2025
*/
class TSScrollBox extends window.PIXI.Container {
    //пока работаем без полосы прокрутки, возможно и не буду добавлять
    constructor(displays, config) {
        super();
        this._items = [];
        this._endY = 0;
        this._pointer_vars = { offset: 0, velocity: 0, target: 0, frame: 0, timestamp: 0, ticker: 0, move_trig: false };
        this._line_capacity = 1;
        this._line_diff = 0;
        this._line_startx = 0;
        this._bulge_coef = false;
        this._slot = displays[0];
        this.config = config;
        this._bulge_coef = Boolean(this.config.height % this.config.snap);
        this._line_capacity = Math.floor(this.config.width / this._slot.width);
        let diff = (this.config.width - this._slot.width * this._line_capacity) / (this._line_capacity + 1);
        this._line_diff = this._slot.width + Math.floor(diff);
        this._line_startx = Math.ceil(diff);
        window.engine.utils.factory.enableInteraction(this, false);
        //this.interactive = true;
        switch (this.config.type) {
            case 0:
                this.on('wheel', (e) => this.scrollWheel(e.deltaY));
                break;
            case 1:
                this.on('pointerdown', (e) => this.startMove(e));
                this.on('pointermove', (e) => this.pointerDrag(e));
                this.on('pointerup', () => this.stopScroll());
                this.on('pointerout', () => this.stopScroll());
                break;
        }
        this.drawBox();
    }
    drawBox() {
        this._bg = window.engine.scene.UI.Graphics.rect(0, 0, this.config.width, this.config.height);
        this._bg.alpha = 0.01;
        this._masker = window.engine.scene.UI.Graphics.rect(0, 0, this.config.width, this.config.height);
        this._real_box = window.engine.utils.factory.createContainer();
        this._real_box.mask = this._masker;
        this.addChild(this._bg, this._real_box, this._masker);
    }
    addItem(item, index = -1) {
        if (index == -1)
            index = this._items.length;
        this._items.splice(index, 0, item);
        this.updateBox();
    }
    deleteItem(index = -1) {
        if (index == -1)
            return;
        this._items.splice(index, 1)[0].destroy(); //достаем элемент и сразу удаляем
        this.updateBox();
        this.returnBox();
    }
    updateBox() {
        for (let i = 0; i < this._items.length; i++) {
            let line = Math.floor(i / this._line_capacity);
            this._items[i].y = line * this.config.snap;
            this._items[i].x = this._line_startx + (i - line * this._line_capacity) * this._line_diff;
            if (Boolean(this._items[0].bg)) {
                this._items[i].y -= this._items[0].bg.y;
                //this._items[i].x -= this._items[0].bg.x;
            }
            if (!Boolean(this._items[i].parent))
                this._real_box.addChild(this._items[i]);
        }
    }
    clearBox(returnY = true) {
        while (this._real_box.children.length)
            this._real_box.children[0].destroy();
        this._items.length = 0;
        if (returnY)
            this._real_box.y = this._endY = 0;
        this.updateBox();
    }
    hideAllItems(returnY = true) {
        while (this._real_box.children.length)
            this._real_box.removeChildAt(0);
        this._items.length = 0;
        if (returnY)
            this._real_box.y = this._endY = 0;
        this.updateBox();
    }
    getSlot() {
        return this._slot.copy();
    }
    //ДЛЯ СКРОЛЛИНГА МЫШКОЙ
    scrollWheel(dY) {
        console.log(dY);
        if (!Boolean(dY))
            return;
        let direct = dY / Math.abs(dY);
        if (this._endY - this.config.snap * direct > 0)
            return;
        if (this._endY - this.config.snap * direct < this.config.height - this._real_box.height - (this._bulge_coef ? this.config.snap : 0))
            return;
        this._endY = this._endY - this.config.snap * direct;
        window.gsap.to(this._real_box, { duration: 0.325, y: this._endY });
    }
    //ДЛЯ ПРОИЗВОЛЬНОГО СКРОЛЛИНГА ПАЛЬЦАМИ/МЫШКОЙ БЕЗ ПРИВЯЗКИ К СЕТКЕ
    startMove(e) {
        if (this._real_box.height > this._masker.height)
            this._pointer_vars.move_trig = true;
        this._pointer_vars.offset = this._real_box.y;
        this._pointer_vars.reference = e.client.y;
        this._pointer_vars.velocity = this._pointer_vars.amplitude = 0;
        this._pointer_vars.frame = this._pointer_vars.offset;
        this._pointer_vars.timestamp = Date.now();
        clearInterval(this._pointer_vars.ticker);
        this._pointer_vars.ticker = setInterval(() => this.trackSpeedScroll(), 100);
    }
    pointerDrag(e) {
        if (!this._pointer_vars.move_trig)
            return;
        this.fingerScroll(this._pointer_vars.offset - (this._pointer_vars.reference - e.client.y));
        this._pointer_vars.reference = e.client.y;
    }
    fingerScroll(delta) {
        this._real_box.y = this._pointer_vars.offset = delta;
        if (!this.checkLimits())
            this.stopScroll();
    }
    trackSpeedScroll() {
        let now, elapsed, delta, v;
        now = Date.now();
        elapsed = now - this._pointer_vars.timestamp;
        this._pointer_vars.timestamp = now;
        delta = this._pointer_vars.offset - this._pointer_vars.frame;
        this._pointer_vars.frame = this._pointer_vars.offset;
        v = 1000 * delta / (1 + elapsed);
        this._pointer_vars.velocity = 0.8 * v + 0.2 * this._pointer_vars.velocity;
    }
    stopScroll() {
        if (!this._pointer_vars.move_trig)
            return;
        this._pointer_vars.move_trig = false;
        clearInterval(this._pointer_vars.ticker);
        if (this._pointer_vars.velocity > 10 || this._pointer_vars.velocity < -10) {
            this._pointer_vars.amplitude = 0.8 * this._pointer_vars.velocity;
            this._pointer_vars.target = Math.round(this._pointer_vars.offset + this._pointer_vars.amplitude);
            this._pointer_vars.timestamp = Date.now();
            requestAnimationFrame(() => this.autoScroll());
        }
        else {
            this.returnBox();
        }
    }
    autoScroll() {
        if (!this.checkLimits()) {
            this._pointer_vars.amplitude = 0;
            this.returnBox();
        }
        let elapsed, delta;
        if (this._pointer_vars.amplitude) {
            elapsed = Date.now() - this._pointer_vars.timestamp;
            delta = -this._pointer_vars.amplitude * Math.exp(-elapsed / 325);
            if (delta > 0.5 || delta < -0.5) {
                this.fingerScroll(this._pointer_vars.target + delta);
                requestAnimationFrame(() => this.autoScroll());
            }
            else {
                this.fingerScroll(this._pointer_vars.target);
            }
        }
    }
    returnBox() {
        let endY = this._real_box.y;
        let max_h = this.config.type == 1 ? this.config.height : Math.floor(this.config.height / this.config.snap) * this.config.snap;
        if (this._real_box.y > 0)
            endY = 0;
        if (max_h > this._real_box.y + this._real_box.height) {
            endY = 0;
            if (this._real_box.height > this.config.height)
                endY = this.config.type == 1 ? max_h - this._real_box.height : max_h - this._real_box.height;
        }
        if (endY == this._real_box.y)
            return;
        window.gsap.to(this._real_box, { duration: 0.325, y: endY });
        this._endY = endY;
    }
    checkLimits() {
        if (this._real_box.y >= this.config.snap / 2 || this._real_box.y < (this.config.height - this._real_box.height - this.config.snap / 2))
            return false;
        return true;
    }
}


/***/ }),

/***/ "./src/engine/scene/ui/sequence.ts":
/*!*****************************************!*\
  !*** ./src/engine/scene/ui/sequence.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSSequence)
/* harmony export */ });
/*
VLADYSLAV TOLMACHOV 2024
*/
class TSSequence extends window.PIXI.Container {
    constructor(input_arr, names = false) {
        super();
        this.uids = names.names || this.searchNames(names);
        for (let i = 0; i < input_arr.length; i++)
            this.addChild(input_arr[i]);
        this.change(0); //обязательно переводим в дефолтное положениe
    }
    change(change_key) {
        if (!this.children[change_key] && this.uids.indexOf(change_key) == -1)
            return; //проверка на валидность ключа
        this.children.forEach((child, i) => {
            child.visible = (i === change_key || this.uids[i] === change_key);
        });
    }
    searchNames(names) {
        let output = [];
        for (let key in names.texture) {
            output.push(window.engine.utils.getShortName(names.texture[key]));
        }
        return output;
    }
}


/***/ }),

/***/ "./src/engine/scene/ui/textinput.ts":
/*!******************************************!*\
  !*** ./src/engine/scene/ui/textinput.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextInput)
/* harmony export */ });
class TextInput extends window.PIXI.Container {
    constructor(styles = {}) {
        super();
        styles.input = { ...{ fontSize: '24pt' }, ...styles.input };
        const pixiStyle = styles.pixiTextStyle || {};
        const domStyleFromPixi = this.convertPIXIStyleToDOM(pixiStyle);
        styles.input = Object.assign({
            fontSize: '24pt',
            position: 'absolute',
            background: 'none',
            border: 'none',
            outline: 'none',
            transformOrigin: '0 0',
            lineHeight: '1'
        }, domStyleFromPixi, styles.input);
        this._input_style = styles.input;
        this._box_generator = null;
        if (this._input_style.hasOwnProperty('multiline')) {
            this._multiline = !!this._input_style.multiline;
            delete this._input_style.multiline;
        }
        else
            this._multiline = false;
        this._box_cache = {};
        this._previous = {};
        this._dom_added = false;
        this._dom_visible = true;
        this._placeholder = '';
        this._placeholderColor = 0xa9a9a9;
        this._selection = [0, 0];
        this._restrict_value = '';
        this._createDOMInput();
        this.substituteText = true;
        this._setState('DEFAULT');
        this._addListeners();
    }
    convertPIXIStyleToDOM(pixiStyle) {
        const domStyle = {};
        if (!pixiStyle)
            return domStyle;
        if (pixiStyle.fontSize) {
            domStyle.fontSize = typeof pixiStyle.fontSize === 'number' ? `${pixiStyle.fontSize}px` : pixiStyle.fontSize;
            domStyle.height = `${(parseInt(pixiStyle.fontSize) * 4) / 3}px`;
        }
        if (pixiStyle.fontFamily)
            domStyle.fontFamily = pixiStyle.fontFamily;
        if (pixiStyle.fontWeight)
            domStyle.fontWeight = pixiStyle.fontWeight;
        if (pixiStyle.letterSpacing)
            domStyle.letterSpacing = `${pixiStyle.letterSpacing}px`;
        if (pixiStyle.align)
            domStyle.textAlign = pixiStyle.align;
        if (pixiStyle.fill)
            domStyle.color = Array.isArray(pixiStyle.fill) ? pixiStyle.fill[0] : pixiStyle.fill;
        return domStyle;
    }
    // GETTERS & SETTERS
    get substituteText() {
        return this._substituted;
    }
    set substituteText(substitute) {
        if (this._substituted == substitute)
            return;
        this._substituted = substitute;
        if (substitute) {
            this._createSurrogate();
            this._dom_visible = false;
        }
        else {
            this._destroySurrogate();
            this._dom_visible = true;
        }
        this.placeholder = this._placeholder;
        this._update();
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(text) {
        this._placeholder = text;
        if (this._substituted) {
            this._updateSurrogate();
            this._dom_input.placeholder = '';
        }
        else {
            this._dom_input.placeholder = text;
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled;
        this._dom_input.disabled = disabled;
        this._setState(disabled ? 'DISABLED' : 'DEFAULT');
    }
    get maxLength() {
        return this._max_length;
    }
    set maxLength(length) {
        this._max_length = length;
        this._dom_input.setAttribute('maxlength', length);
    }
    get restrict() {
        return this._restrict_regex;
    }
    set restrict(regex) {
        if (regex instanceof RegExp) {
            regex = regex.toString().slice(1, -1);
            if (regex.charAt(0) !== '^')
                regex = '^' + regex;
            if (regex.charAt(regex.length - 1) !== '$')
                regex = regex + '$';
            regex = new RegExp(regex);
        }
        else {
            regex = new RegExp('^[' + regex + ']*$');
        }
        this._restrict_regex = regex;
    }
    get text() {
        return this._dom_input.value;
    }
    set text(text) {
        this._dom_input.value = text;
        if (this._substituted)
            this._updateSurrogate();
    }
    get htmlInput() {
        return this._dom_input;
    }
    focus() {
        if (this._substituted && !this.dom_visible)
            this._setDOMInputVisible(true);
        this._dom_input.focus();
    }
    blur() {
        this._dom_input.blur();
    }
    select() {
        this.focus();
        this._dom_input.select();
    }
    destroy(options) {
        this._destroyBoxCache();
        super.destroy(options);
    }
    // SETUP
    _createDOMInput() {
        if (this._multiline) {
            this._dom_input = document.createElement('textarea');
            this._dom_input.style.resize = 'none';
        }
        else {
            this._dom_input = document.createElement('input');
            this._dom_input.type = 'text';
        }
        for (let key in this._input_style) {
            this._dom_input.style[key] = this._input_style[key];
        }
    }
    _addListeners() {
        this.on('added', this._onAdded.bind(this));
        this.on('removed', this._onRemoved.bind(this));
        this._dom_input.addEventListener('keydown', this._onInputKeyDown.bind(this));
        this._dom_input.addEventListener('input', this._onInputInput.bind(this));
        this._dom_input.addEventListener('keyup', this._onInputKeyUp.bind(this));
        this._dom_input.addEventListener('focus', this._onFocused.bind(this));
        this._dom_input.addEventListener('blur', this._onBlurred.bind(this));
    }
    _onInputKeyDown(e) {
        this._selection = [
            this._dom_input.selectionStart,
            this._dom_input.selectionEnd
        ];
        this.emit('keydown', e.keyCode);
    }
    _onInputInput(e) {
        if (this._restrict_regex)
            this._applyRestriction();
        if (this._substituted)
            this._updateSubstitution();
        this.emit('input', this.text);
    }
    _onInputKeyUp(e) {
        this.emit('keyup', e.keyCode);
    }
    _onFocused() {
        this._setState('FOCUSED');
        this.emit('focus');
    }
    _onBlurred() {
        this._setState('DEFAULT');
        this.emit('blur');
    }
    _onAdded() {
        document.body.appendChild(this._dom_input);
        this._dom_input.style.display = 'none';
        this._dom_added = true;
    }
    _onRemoved() {
        document.body.removeChild(this._dom_input);
        this._dom_added = false;
    }
    _setState(state) {
        this.state = state;
        if (this._substituted)
            this._updateSubstitution();
    }
    // RENDER & UPDATE
    // for pixi v5
    render(renderer) {
        super.render(renderer);
        this._renderInternal(renderer);
    }
    _renderInternal(renderer) {
        this._resolution = renderer.resolution;
        this._last_renderer = renderer;
        this._canvas_bounds = this._getCanvasBounds();
        if (this._needsUpdate())
            this._update();
    }
    _update() {
        this._updateDOMInput();
        if (this._substituted)
            this._updateSurrogate();
    }
    _updateSubstitution() {
        if (this.state === 'FOCUSED') {
            this._dom_visible = true;
            this._surrogate.visible = this.text.length === 0;
        }
        else {
            this._dom_visible = false;
            this._surrogate.visible = true;
        }
        this._updateDOMInput();
        this._updateSurrogate();
    }
    _updateDOMInput() {
        if (!this._canvas_bounds)
            return;
        this._dom_input.style.top = (this._canvas_bounds.top - 1 || 0) + 'px';
        this._dom_input.style.left = (this._canvas_bounds.left || 0) + 'px';
        this._dom_input.style.transform = this._pixiMatrixToCSS(this._getDOMRelativeWorldTransform());
        this._dom_input.style.opacity = this.worldAlpha;
        this._setDOMInputVisible(this.worldVisible && this._dom_visible);
        this._previous.canvas_bounds = this._canvas_bounds;
        this._previous.world_transform = this.worldTransform.clone();
        this._previous.world_alpha = this.worldAlpha;
        this._previous.world_visible = this.worldVisible;
    }
    _applyRestriction() {
        if (this._restrict_regex.test(this.text)) {
            this._restrict_value = this.text;
        }
        else {
            this.text = this._restrict_value;
            this._dom_input.setSelectionRange(this._selection[0], this._selection[1]);
        }
    }
    // STATE COMPAIRSON (FOR PERFORMANCE BENEFITS)
    _needsUpdate() {
        return (!this._comparePixiMatrices(this.worldTransform, this._previous.world_transform)
            || !this._compareClientRects(this._canvas_bounds, this._previous.canvas_bounds)
            || this.worldAlpha != this._previous.world_alpha
            || this.worldVisible != this._previous.world_visible);
    }
    _needsNewBoxCache() {
        let input_bounds = this._getDOMInputBounds();
        return (!this._previous.input_bounds
            || input_bounds.width != this._previous.input_bounds.width
            || input_bounds.height != this._previous.input_bounds.height);
    }
    // INPUT SUBSTITUTION
    _createSurrogate() {
        this._surrogate_hitbox = new window.PIXI.Graphics();
        this._surrogate_hitbox.alpha = 0;
        this._surrogate_hitbox.eventMode = 'static';
        this._surrogate_hitbox.cursor = 'text';
        this._surrogate_hitbox.on('pointerdown', this._onSurrogateFocus.bind(this));
        this._surrogate_mask = new window.PIXI.Graphics();
        this._surrogate = new window.PIXI.Text('', {});
        this._surrogate.mask = this._surrogate_mask;
        this.addChild(this._surrogate_mask, this._surrogate, this._surrogate_hitbox);
        this._updateSurrogate();
    }
    _updateSurrogate() {
        let padding = this._deriveSurrogatePadding();
        let input_bounds = this._getDOMInputBounds();
        this._surrogate.style = this._deriveSurrogateStyle();
        this._surrogate.style.padding = Math.max.apply(Math, padding);
        this._surrogate.y = Math.floor(this._multiline ? padding[0] : (input_bounds.height - this._surrogate.height) / 2);
        this._surrogate.x = padding[3];
        this._surrogate.text = this._deriveSurrogateText();
        switch (this._surrogate.style.align) {
            case 'left':
                this._surrogate.x = padding[3];
                break;
            case 'center':
                this._surrogate.x = input_bounds.width * 0.5 - this._surrogate.width * 0.5;
                break;
            case 'right':
                this._surrogate.x = input_bounds.width - padding[1] - this._surrogate.width;
                break;
        }
        this._updateSurrogateHitbox(input_bounds);
        this._updateSurrogateMask(input_bounds, padding);
    }
    _updateSurrogateHitbox(bounds) {
        this._surrogate_hitbox.clear();
        this._surrogate_hitbox.beginFill(0);
        this._surrogate_hitbox.drawRect(0, 0, bounds.width, bounds.height);
        this._surrogate_hitbox.endFill();
        this._surrogate_hitbox.eventMode = this._disabled ? 'auto' : 'static';
        //if (PIXI.VERSION[0] != '7') this._surrogate_hitbox.interactive = !this._disabled
    }
    _updateSurrogateMask(bounds, padding) {
        this._surrogate_mask.clear();
        this._surrogate_mask.beginFill(0);
        this._surrogate_mask.drawRect(padding[3], 0, bounds.width - padding[3] - padding[1], bounds.height);
        this._surrogate_mask.endFill();
    }
    _destroySurrogate() {
        if (!this._surrogate)
            return;
        this.removeChild(this._surrogate);
        this.removeChild(this._surrogate_hitbox);
        this._surrogate.destroy();
        this._surrogate_hitbox.destroy();
        this._surrogate = null;
        this._surrogate_hitbox = null;
    }
    _onSurrogateFocus() {
        this._setDOMInputVisible(true);
        //sometimes the input is not being focused by the mouseclick
        setTimeout(this._ensureFocus.bind(this), 10);
    }
    _ensureFocus() {
        if (!this._hasFocus())
            this.focus();
    }
    _deriveSurrogateStyle() {
        let style = new window.PIXI.TextStyle();
        for (var key in this._input_style) {
            switch (key) {
                case 'color':
                    style.fill = this._input_style.color;
                    break;
                case 'fontFamily':
                case 'fontSize':
                case 'fontWeight':
                case 'fontVariant':
                case 'fontStyle':
                    style[key] = this._input_style[key];
                    break;
                case 'letterSpacing':
                    style.letterSpacing = parseFloat(this._input_style.letterSpacing);
                    break;
                case 'textAlign':
                    style.align = this._input_style.textAlign;
                    break;
            }
        }
        if (this._multiline) {
            style.lineHeight = parseFloat(style.fontSize);
            style.wordWrap = true;
            style.wordWrapWidth = this._getDOMInputBounds().width;
        }
        if (this._dom_input.value.length === 0)
            style.fill = this._placeholderColor;
        return style;
    }
    _deriveSurrogatePadding() {
        let indent = this._input_style.textIndent ? parseFloat(this._input_style.textIndent) : 0;
        if (this._input_style.padding && this._input_style.padding.length > 0) {
            let components = this._input_style.padding.trim().split(' ');
            if (components.length == 1) {
                let padding = parseFloat(components[0]);
                return [padding, padding, padding, padding + indent];
            }
            else if (components.length == 2) {
                let paddingV = parseFloat(components[0]);
                let paddingH = parseFloat(components[1]);
                return [paddingV, paddingH, paddingV, paddingH + indent];
            }
            else if (components.length == 4) {
                let padding = components.map((component) => {
                    return parseFloat(component);
                });
                padding[3] += indent;
                return padding;
            }
        }
        return [0, 0, 0, indent];
    }
    _deriveSurrogateText() {
        if (this._dom_input.value.length === 0)
            return this._placeholder;
        if (this._dom_input.type == 'password')
            return '•'.repeat(this._dom_input.value.length);
        return this._dom_input.value;
    }
    // CACHING OF INPUT BOX GRAPHICS
    _buildBoxCache() {
        this._destroyBoxCache();
        let states = ['DEFAULT', 'FOCUSED', 'DISABLED'];
        let input_bounds = this._getDOMInputBounds();
        for (let i in states) {
            this._box_cache[states[i]] = this._box_generator(input_bounds.width, input_bounds.height, states[i]);
        }
        this._previous.input_bounds = input_bounds;
    }
    _destroyBoxCache() {
        if (this._box) {
            this.removeChild(this._box);
            this._box = null;
        }
        for (let i in this._box_cache) {
            this._box_cache[i].destroy();
            this._box_cache[i] = null;
            delete this._box_cache[i];
        }
    }
    // HELPER FUNCTIONS
    _hasFocus() {
        return document.activeElement === this._dom_input;
    }
    _setDOMInputVisible(visible) {
        this._dom_input.style.display = visible ? 'block' : 'none';
    }
    _getCanvasBounds() {
        let rect = this._last_renderer.view.getBoundingClientRect();
        let bounds = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
        bounds.left += window.scrollX;
        bounds.top += window.scrollY;
        return bounds;
    }
    _getDOMInputBounds() {
        let remove_after = false;
        if (!this._dom_added) {
            document.body.appendChild(this._dom_input);
            remove_after = true;
        }
        let org_transform = this._dom_input.style.transform;
        let org_display = this._dom_input.style.display;
        this._dom_input.style.transform = '';
        this._dom_input.style.display = 'block';
        let bounds = this._dom_input.getBoundingClientRect();
        this._dom_input.style.transform = org_transform;
        this._dom_input.style.display = org_display;
        if (remove_after)
            document.body.removeChild(this._dom_input);
        return bounds;
    }
    _getDOMRelativeWorldTransform() {
        let canvas_bounds = this._last_renderer.view.getBoundingClientRect();
        let matrix = this.worldTransform.clone();
        matrix.scale(this._resolution, this._resolution);
        matrix.scale(canvas_bounds.width / this._last_renderer.width, canvas_bounds.height / this._last_renderer.height);
        return matrix;
    }
    _pixiMatrixToCSS(m) {
        return 'matrix(' + [m.a, m.b, m.c, m.d, m.tx, m.ty].join(',') + ')';
    }
    _comparePixiMatrices(m1, m2) {
        if (!m1 || !m2)
            return false;
        return (m1.a == m2.a
            && m1.b == m2.b
            && m1.c == m2.c
            && m1.d == m2.d
            && m1.tx == m2.tx
            && m1.ty == m2.ty);
    }
    _compareClientRects(r1, r2) {
        if (!r1 || !r2)
            return false;
        return (r1.left == r2.left
            && r1.top == r2.top
            && r1.width == r2.width
            && r1.height == r2.height);
    }
}
``;


/***/ }),

/***/ "./src/engine/scene/ui/ui.ts":
/*!***********************************!*\
  !*** ./src/engine/scene/ui/ui.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSUI)
/* harmony export */ });
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./src/engine/scene/ui/button.ts");
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkbox */ "./src/engine/scene/ui/checkbox.ts");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropdown */ "./src/engine/scene/ui/dropdown.ts");
/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphics */ "./src/engine/scene/ui/graphics.ts");
/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sequence */ "./src/engine/scene/ui/sequence.ts");
/* harmony import */ var _textinput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./textinput */ "./src/engine/scene/ui/textinput.ts");
/* harmony import */ var _scrollbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scrollbox */ "./src/engine/scene/ui/scrollbox.ts");







class TSUI {
    constructor() {
        this.Button = _button__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.Sequence = _sequence__WEBPACK_IMPORTED_MODULE_4__["default"];
        this.Graphics = new _graphics__WEBPACK_IMPORTED_MODULE_3__["default"](); //временная затычка пока не перейдем на PIXI 8
        this.TextInput = _textinput__WEBPACK_IMPORTED_MODULE_5__["default"];
        this.DropDown = _dropdown__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.CheckBox = _checkbox__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.ScrollBox = _scrollbox__WEBPACK_IMPORTED_MODULE_6__["default"];
    }
}


/***/ }),

/***/ "./src/engine/server/php_connect.ts":
/*!******************************************!*\
  !*** ./src/engine/server/php_connect.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PHPConnect)
/* harmony export */ });
/* harmony import */ var _crypto_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../crypto/crypto */ "./src/engine/crypto/crypto.ts");
/**********************************/
/********Vladyslav Tolmachov***********/
/**********2023******************/

/*Class for Tolmasoft Engine 5.0.1*/
class PHPConnect {
    constructor() {
        this.wait = false;
        this.start_method = 'secure.getToken';
        this.token = false;
    }
    init(args) {
        this.app_data = args;
    }
    send(method, params = {}, onComplete, onError) {
        if (this.wait)
            return;
        this.startWait(); //тут можно показать анимацию и запретить любые действия
        //Формируем параметры для запроса
        let request_params = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', //избавляет от гемора с хешем в конце адреса
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            }
        };
        let request_body = {
            function: method,
            user_params: params,
            req_key: this.app_data['req_key'],
            token: this.token
        };
        if (method == this.start_method)
            Object.assign(request_body, this.app_data);
        request_params.body = JSON.stringify(request_body); //шифруем именно тут если секьюрный метод
        console.log(request_params.body);
        fetch(this.app_data['url'], request_params) //ТУТ КИДАЕМ ЗАПРОС К СЕРВЕРУ!!!
            .then(data => {
            this.endWait(); //закончили ожидание, убрали все анимации
            if (data.status != 200) { //если запрос не прошел
                if (Boolean(onError))
                    return this.formError('Ошибка запроса №' + data.status + '. Повторите или перезагрузите игру');
                return;
            }
            data.json().then((e) => {
                let output = e;
                this.parseData(output);
                if (output.status == 'error')
                    return onError(output);
                if (Boolean(onComplete))
                    onComplete(output);
            }).catch(() => {
                if (Boolean(onError))
                    return onError(this.formError('Получены не валидные данные. Повторите или перезагрузите игру'));
            });
        })
            .catch(error => {
            this.endWait();
            if (Boolean(onError))
                return onError(this.formError('Ошибка выполнения запроса. Повторите или перезагрузите игру'));
        });
    }
    secureSend(method, params = {}, onComplete, onError) {
        if (!window.engine.crypto)
            window.engine.crypto = new _crypto_crypto__WEBPACK_IMPORTED_MODULE_0__["default"]();
        let data = window.engine.crypto.rsa.encrypt(JSON.stringify(params));
        if (!Boolean(data)) {
            console.warn('Data encryption error');
            return;
        }
        params = { crypto: data };
        this.send(method, params, onComplete, onError);
    }
    parseData(data) {
        if (Boolean(data['udata']))
            window.udata = data['udata'];
        if (Boolean(data['current_time']))
            window.TIME = data['current_time'];
        if (Boolean(data['req_key']))
            this.app_data['req_key'] = data['req_key'];
        if (Boolean(data['token']))
            this.token = data['token'];
    }
    startWait() {
        this.wait = true;
    }
    endWait() {
        this.wait = false;
    }
    formError(message) {
        return { status: 'error', message: message };
    }
}


/***/ }),

/***/ "./src/engine/server/server.ts":
/*!*************************************!*\
  !*** ./src/engine/server/server.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSServer)
/* harmony export */ });
/* harmony import */ var _php_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./php_connect */ "./src/engine/server/php_connect.ts");

class TSServer {
    constructor() {
        this.php = new _php_connect__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
}


/***/ }),

/***/ "./src/engine/utils/display-factory.ts":
/*!*********************************************!*\
  !*** ./src/engine/utils/display-factory.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisplayFactory)
/* harmony export */ });
class DisplayFactory {
    // ====== СОЗДАНИЕ ОБЪЕКТОВ ======
    constructor() {
    }
    createContainer() {
        return new window.PIXI.Container();
    }
    createSprite(texture) {
        const isDisplayObject = texture instanceof window.PIXI.DisplayObject;
        if (isDisplayObject) {
            // Если это уже DisplayObject — возвращаем его как есть
            return texture;
        }
        else {
            try {
                // Иначе создаём спрайт через window.engine.utils.factory
                return new window.PIXI.Sprite(texture);
            }
            catch (e) {
                console.error('TSSprite: Failed to create sprite from texture.', e);
                return window.engine.utils.factory.createContainer();
            }
        }
    }
    createGraphics() {
        return new window.PIXI.Graphics();
    }
    createText(text, style) {
        return new window.PIXI.Text(text, style);
    }
    // ====== УПРАВЛЕНИЕ ОБЪЕКТАМИ ======
    enableInteraction(target, pointer = true) {
        //window.engine.utils.detectPixiVersion()
        if ('eventMode' in target) {
            target.eventMode = 'static';
        }
        else {
            target.interactive = true;
        }
        if (('cursor' in target) && pointer) {
            target.cursor = 'pointer';
        }
    }
    disableInteraction(target) {
        if ('eventMode' in target) {
            target.eventMode = 'none';
        }
        else {
            target.interactive = false;
        }
    }
    setMask(target, mask) {
        target.mask = mask;
    }
    clearMask(target) {
        target.mask = null;
    }
    setPivotCenter(target) {
        if ('width' in target && 'height' in target) {
            target.pivot.x = target.width / 2;
            target.pivot.y = target.height / 2;
        }
    }
}


/***/ }),

/***/ "./src/engine/utils/json_more.ts":
/*!***************************************!*\
  !*** ./src/engine/utils/json_more.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JSONmore)
/* harmony export */ });
class JSONmore {
    constructor() {
    }
    copy(source) {
        return typeof structuredClone === "function" ? structuredClone(source) : JSON.parse(JSON.stringify(source));
    }
    parse(source) {
        let output = {};
        try {
            output = JSON.parse(source);
        }
        catch (err) {
            console.warn('JSON.parse error:', err);
        }
        return output;
    }
    load(link, callback) {
        fetch(link).then((e) => {
            e.json().then((e) => {
                if (Boolean(callback))
                    callback(e);
            }).catch(() => {
                if (Boolean(callback))
                    callback(false);
            });
        }).catch(() => {
            if (Boolean(callback))
                callback(false);
        });
    }
    swap(arr, a, b) {
        arr[a] = arr.splice(b, 1, arr[a])[0];
        return arr;
    }
    JSONparse(source) {
        console.warn('JSONparse() is deprecated. Use parse() since 5.0.2');
        return this.parse(source);
    }
    JSONLoad(link, callback) {
        console.warn('JSONLoad() is deprecated. Use load() since 5.0.2');
        return this.load(link, callback);
    }
    JSONcopy(source) {
        console.warn('JSONcopy() is deprecated. Use copy() since 5.0.2');
        return this.copy(source);
    }
}


/***/ }),

/***/ "./src/engine/utils/localstore.ts":
/*!****************************************!*\
  !*** ./src/engine/utils/localstore.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalStore)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/engine/utils/utils.ts");

class LocalStore {
    constructor() {
    }
    init(name, def) {
        this.name = name;
        this.def = window.engine.utils.json.JSONcopy(def);
        if (!window.engine.utils)
            window.engine.utils = new _utils__WEBPACK_IMPORTED_MODULE_0__["default"]();
        //сначала чекаем можно ли достучаться к реальному стору, а потом уже делаем свои манипуляции. Ответ может вернутья false, null или объект localStorage. От этого и пляшем
        let check = this.localCheck(name);
        if (Boolean(check))
            this.data = window.engine.utils.json.parse(check); //если пришел объект localStorage
        if (this.data.version != def.version || !Boolean(check))
            this.data = window.engine.utils.json.JSONcopy(def); //если устаревшая версия или еще не создали ключ или работаем в локальном режиме
        this.save(); //обязательно закрепляем результаты
    }
    save() {
        if (this.mode == 'permanent')
            window.localStorage.setItem(this.name, JSON.stringify(this.data));
    }
    refresh() {
        this.data = window.engine.utils.json.JSONcopy(this.def);
        this.save();
    }
    import(obj) {
        this.data = window.engine.utils.json.copy(obj);
        this.save();
    }
    localCheck(name) {
        try {
            window.localStorage.setItem('test', 'test');
            window.localStorage.removeItem('test');
            this.mode = 'permanent';
            return localStorage.getItem(name);
        }
        catch (e) {
            this.mode = 'session';
            console.warn('Local Storage save only for this session!');
            return false;
        }
    }
    get(key) {
        return this.data?.[key];
    }
    set(key, value) {
        this.data[key] = value;
        this.save();
    }
    toggle(key) {
        this.set(key, !this.get(key));
    }
    dump() {
        return window.engine.utils.json.copy(this.data);
    }
    //Функции внизу пока просто затычки. Но я хочу попробовать запхать какие-то большие данные не в кэш, а именно в LocalStore, чтобы можно было хранить там версию файла и т.п. Было бы круто вытаскивать оттуда какие-то пласты контента
    initDATA(name) {
        return true;
    }
    takeDATA(name) {
    }
    deleteDATA(name) {
    }
}


/***/ }),

/***/ "./src/engine/utils/numbers.ts":
/*!*************************************!*\
  !*** ./src/engine/utils/numbers.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSNumbers)
/* harmony export */ });
class TSNumbers {
    constructor() {
        this.short_postfixes = ['', 'K', 'M', 'B', 'T', 'q', 'Q', 's', 'S'];
        this.short_counts = [1, 1000, 1000000, 1000000000, 1000000000000, 1000000000000000, 1000000000000000000, 1000000000000000000000, 1000000000000000000000000];
        this.Easing = {
            linear: (t) => t,
            easeOutQuad: (t) => t * (2 - t),
            easeInQuad: (t) => t * t,
            easeInOutCubic: (t) => t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2,
        };
    }
    shortNumber(value, fraction = true) {
        let index = this.short_counts.length - 1;
        while (value / this.short_counts[index] < 1 && index > 0)
            index--; //идем на убывание пока не получим вменяемое число
        let transit = value / this.short_counts[index]; //ТРАНЗИТНОЕ значение. Просто не обрезанное число после деления на множитель
        return fraction ? Number(transit.toFixed(2)) + this.short_postfixes[index] : Math.round(transit) + this.short_postfixes[index]; //если есть fraction то показываем число в виде 999.99K, если НЕТ то просто 999K 
    }
    fullNumber(str) {
        let index = this.short_postfixes.indexOf(str.slice(-1));
        let transit = this.realNumber(str);
        return transit * (index == -1 ? 1 : this.short_counts[index]); //если это сокращение - 
    }
    prettyNumber(num, delimiter = ',') {
        let arr = num.toString().split(''); //разбили строку на символы
        for (let i = arr.length - 3; i > 0; i -= 3)
            arr.splice(i, 0, delimiter);
        return arr.join('');
    }
    realNumber(str) {
        return parseFloat(str.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')); //убирает все буквы и символы кроме точки
    }
    timeConverter(seconds) {
        seconds = Math.max(0, seconds);
        let minutes = Math.floor(seconds / 60); // минуты
        let hours = Math.floor(minutes / 60); // часы
        let days = Math.floor(hours / 24); // часы
        seconds %= 60; // % - это остача от деления
        minutes %= 60;
        hours %= 24;
        return (days ? days + ':' : '') + (hours ? this.getZeros(hours) + ':' : '') + this.getZeros(minutes) + (days ? '' : ':' + this.getZeros(seconds)); //если нет дней и часов - скрываем их и не показываем. Если есть дни - скрываем секунды
    }
    getZeros(num) {
        return (num < 10 ? '0' : '') + num; //ставит 0 в начало если число меньше 10 и превращает число в строку
    }
}


/***/ }),

/***/ "./src/engine/utils/timers.ts":
/*!************************************!*\
  !*** ./src/engine/utils/timers.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSTimers)
/* harmony export */ });
/*
VLADYSLAV TOLMACHOV 2024
*/
/*
Логика работы:

При вызове CONSTRUCTOR запускается отсчет времени

После каждого INTERVAL проверяем поменялось ли время. И считаем НА СКОЛЬКО оно поменялось

После просчета правильного diff time (на сколько поменялось) запускается проверка таймеров

В каждом таймере есть несколько ВАЖНЫХ параметров, которые описаны чуть ниже в структуре. ВАЖНО! в code вписать путь к функции которая будет возвращать ответ в callback. Она формирует на основании внутренних данных нужную инфу на выходе
*/
class TSTimers {
    constructor() {
    }
    init(real_time = 0) {
        if (!Boolean(real_time))
            real_time = Math.floor(Date.now() / 1000);
        window.TIME = real_time;
        window.DATE = new Date(window.TIME * 1000);
        this.updateSeason();
        this.start_t = performance.now();
        this.timers = {
            energy: { init: false, code: this.defaultTick, tick: false, prop: { loop: true, end: 0 } }
        };
    }
    tick() {
        let end_t = performance.now();
        let plus = Math.floor((end_t - this.start_t) / 1000);
        requestAnimationFrame(this.tick);
        if (!Boolean(plus))
            return; //следующий код ТОЛЬКО когда таймер "тикнул", чтобы не перегружать лишний раз клиент
        window.TIME += plus;
        this.start_t = end_t;
        this.utc_diff = new Date().getTimezoneOffset() + 180; //180 это часовой пояс MSK (+3*60)
        window.DATE.setTime((window.TIME + 60 * this.utc_diff) * 1000);
        if (this.month != window.DATE.getMonth())
            this.updateSeason();
        this.checkTimers();
    }
    checkTimers() {
        for (let key in this.timers) {
            if (!this.timers[key].init || !this.timers[key].tick)
                continue; //ВАЖНО проверять и init и tick т.к. если tick не назначен, то некуда передавать результаты просчета таймера
            this.timers[key].tick(this.timers[key].tick.code(key));
        }
    }
    defaultTick(name) {
        let endpoint = this.timers[name].prop.end;
        if (!endpoint)
            return { status: 'tick', time: window.TIME, date: window.DATE };
        let timer_sec = endpoint - window.TIME;
        return (timer_sec <= 0) ? { status: 'end' } : { status: 'tick', time: timer_sec };
    }
    loopTick(name) {
        let prop = this.timers[name].prop;
        let timer_sec = prop.end - window.TIME;
        if (timer_sec > 0) {
            return { status: 'tick', time: timer_sec };
        }
        else { //на синтетике и вручную посчитал всё, должно работать. По факту нужно проверять. ВСЯ ОБРАБОТКА ПРОИСХОДИТ В ИГРЕ! Движок только сообщает сколько кругов прошли и сколько осталось до конца круга. Если прошли круг - время покажет как время круга (типа новый начался)
            let diff = Math.floor(Math.abs(timer_sec) / prop.loop);
            let diff_sec = diff * prop.loop - (window.TIME - prop.end - prop.loop);
            return { status: 'loop', diff: diff, time: diff_sec };
        }
    }
    addTimer(name, code, tick, prop) {
        if (this.timers[name])
            return false;
        this.timers[name] = {
            init: true,
            code: code,
            tick: tick ? tick : false, //тернарник наше всё. НО обязательно проверить, возможно не будет работать
            prop: prop ? prop : { loop: false, end: 0 }
        };
        return false;
    }
    removeTimer(name) {
        if (!this.timers[name])
            return false;
        delete this.timers[name];
    }
    pauseTimer(name) {
        if (!this.timers[name])
            return false;
        this.timers[name].init = false;
        return true;
    }
    startTimer(name) {
        if (!this.timers[name])
            return false;
        this.timers[name].init = true;
        return true;
    }
    updateSeason() {
        window.SEASON = ['winter', 'spring', 'summer', 'autumn'][((window.DATE.getMonth() + 1) / 3) % 4];
        this.month = window.DATE.getMonth();
    }
}


/***/ }),

/***/ "./src/engine/utils/utils.ts":
/*!***********************************!*\
  !*** ./src/engine/utils/utils.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSUtils)
/* harmony export */ });
/* harmony import */ var _display_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display-factory */ "./src/engine/utils/display-factory.ts");
/* harmony import */ var _json_more__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json_more */ "./src/engine/utils/json_more.ts");
/* harmony import */ var _localstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localstore */ "./src/engine/utils/localstore.ts");
/* harmony import */ var _numbers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./numbers */ "./src/engine/utils/numbers.ts");
/* harmony import */ var _timers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timers */ "./src/engine/utils/timers.ts");





class TSUtils {
    constructor() {
        this.pixi_v = 0;
        this.json = new _json_more__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.timers = new _timers__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.numbers = new _numbers__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.localstore = new _localstore__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.factory = new _display_factory__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.getShortName = this.createGetShortName();
    }
    detectPixiVersion() {
        if (this.pixi_v)
            return this.pixi_v;
        const version = (window.PIXI.VERSION || "7.0.0").split('.');
        this.pixi_v = parseInt(version[0], 10) || 7;
        return this.pixi_v;
    }
    createGetShortName() {
        const cache = new Map();
        return function getShortName(key) {
            if (typeof key !== 'string' || key.length === 0) {
                console.warn('getShortName: invalid key (not a string or empty)', key);
                return '';
            }
            if (cache.has(key)) {
                return cache.get(key);
            }
            let shortname;
            if (key.length <= 50) {
                const parts = key.split('_');
                shortname = parts[parts.length - 1] || '';
            }
            else {
                const lastUnderscore = key.lastIndexOf('_');
                shortname = lastUnderscore >= 0 ? key.substring(lastUnderscore + 1) : key;
            }
            if (shortname.length === 0) {
                console.warn(`getShortName: trailing underscore detected in key "${key}"`);
            }
            cache.set(key, shortname);
            return shortname;
        };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./src/engine.ts");
//VLADYSLAV TOLMACHOV 12/23
//Файл создан как входная точка для инициализации глобальных переменных

//import Game from "./game";
window.engine = new _engine__WEBPACK_IMPORTED_MODULE_0__["default"]();
//window.game = new Game();

})();

/******/ })()
;
//# sourceMappingURL=core.js.map