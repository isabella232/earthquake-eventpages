/* global define */
define([
	'util/Util',
	'./MomentTensorPage',
	'summary/Attribution'
], function (
	Util,
	MomentTensorPage,
	Attribution
) {
	'use strict';


	var DEFAULTS = {};

	/**
	 * Construct a new FocalMechanismPage.
	 *
	 * @param options {Object}
	 *        module options.
	 * @see MomentTensorPage.
	 */
	var FocalMechanismPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		this._code = options.code;
		MomentTensorPage.call(this, options);
	};

	// extend MomentTensorPage
	FocalMechanismPage.prototype = Object.create(MomentTensorPage.prototype);


	FocalMechanismPage.prototype._getSummaryMarkup = function (tensor) {
		var np1 = tensor.NP1,
		    np2 = tensor.NP2,
		    source = Attribution.getContributor(tensor.source);

		console.log(tensor);

		return [
					'<ul>',
						'<li class="image">',
							'<img src="', this.getBeachball(tensor), '" />',
						'</li>',
						'<li>',
							'<span>',
								Math.round(np1.strike), '<i>/</i>',
								Math.round(np1.dip), '<i>/</i>',
								Math.round(np1.rake),
							'</span>',
							'<abbr title="Nodal Plane 1">',
								'Strike<i>/</i>Dip<i>/</i>Rake</abbr>',
							'</abbr>',
						'</li>',
						'<li>',
							'<span>',
								Math.round(np2.strike), '<i>/</i>',
								Math.round(np2.dip), '<i>/</i>',
								Math.round(np2.rake),
							'</span>',
							'<abbr title="Nodal Plane 2">',
								'Strike<i>/</i>Dip<i>/</i>Rake</abbr>',
							'</abbr>',
						'</li>',
						'<li class="summary-hide">',
							'<span>', tensor.source.toUpperCase(), '</span>',
							'<abbr title="', (source ? source.title : 'Contributor'),
									'">Source</abbr>',
						'</li>',
					'</ul>',
		].join('');
	};

	/**
	 * Mechanism info.
	 *
	 * @param tensor {Tensor}
	 *        the focal-mechanism product.
	 * @return {String} info table.
	 */
	FocalMechanismPage.prototype._getInfo = function (tensor) {
		return [
			'<table class="info-table tabular"><tbody>',
			'<tr><th scope="row">Author</th>',
				'<td>', tensor.source, '</td></tr>',
			'<tr><th scope="row">Catalog</th>',
				'<td>', tensor.product.properties.eventsource, '</td></tr>',
			'<tr><th scope="row">Contributor</th>',
				'<td>', tensor.product.source, '</td></tr>',
			'<tr><th scope="row">Code</th>',
				'<td>', tensor.product.code, '</td></tr>',
			'</tbody></table>'
		].join('');
	};

	/**
	 * Mechanism Axes information.
	 *
	 * @return {String} empty string, don't show axes for mechanism.
	 */
	FocalMechanismPage.prototype._getAxes = function () {
		return '';
	};


	// return constructor
	return FocalMechanismPage;
});
