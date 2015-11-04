'use strict';

var extract = require('extract-comments');

/**
 * Strip comments from the given `string`.
 *
 * @param {String} `string`
 * @param {Object} `options` Pass `safe: true` to keep comments with `!`
 * @return {String}
 * @api public
 */

function strip(str, options) {
  return block(line(str, options), options);
}

/**
 * Strip block comments from the given `string`.
 *
 * @param {String} `string`
 * @param {Object} `options` Pass `safe: true` to keep comments with `!`
 * @return {String}
 * @api public
 */

function block(str, options) {
  return stripEach(str, extract.block(str), options);
}

/**
 * Strip line comments from the given `string`.
 *
 * @param {String} `string`
 * @param {Object} `options` Pass `safe: true` to keep comments with `!`
 * @return {String}
 * @api public
 */

function line(str, options) {
  return stripEach(str, extract.line(str), options);
}

/**
 * Strip the first comment from the given `string`.
 *
 * @param {String} `string`
 * @param {Object} `options` Pass `safe: true` to keep comments with `!`
 * @return {String}
 * @api public
 */

function first(str, options) {
  return stripEach(str, extract.first(str), options);
}

/**
 * Private function for stripping comments.
 *
 * @param {String} `string`
 * @param {Object} `options` Pass `safe: true` to keep comments with `!`
 * @return {String}
 */

function stripEach(str, comments, options) {
  comments.forEach(function(comment) {
    str = discard(str, comment, options);
  });
  return str;
}

/**
 * Remove a comment from the given string.
 *
 * @param {String} `string`
 * @param {Object} `options` Pass `safe: true` to keep comments with `!`
 * @return {String}
 * @api public
 */

function discard(str, comment, opts) {
  var ch = comment.value.charAt(0);
  if (opts && opts.safe === true && ch === '!') {
    return str;
  }
  return str.split(comment.raw).join('');
}

/**
 * Expose `strip`
 */

module.exports = strip;

/**
 * Expose methods
 */

module.exports.block = block;
module.exports.first = first;
module.exports.line = line;
