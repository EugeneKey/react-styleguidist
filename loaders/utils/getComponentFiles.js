'use strict';

const path = require('path');
const glob = require('glob');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');

/**
 * Return absolute paths of components that should be rendered in the style guide.
 *
 * @param {string|Function} components Function or glob pattern.
 * @param {string} rootDir
 * @returns {Array}
 */
module.exports = function getComponentFiles(components, rootDir) {
	if (!components) {
		return [];
	}

	let componentFiles;
	if (isFunction(components)) {
		componentFiles = components();
	}
	else if (isString(components)) {
		componentFiles = glob.sync(path.resolve(rootDir, components));
	}
	else {
		throw new Error(`Styleguidist: components should be string or function, received ${typeof components}.`);
	}

	// Make paths absolute
	componentFiles = componentFiles.map(file => path.resolve(rootDir, file));

	return componentFiles;
};
