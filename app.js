"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/** @jsx h */
var autocomplete_js_1 = require("@algolia/autocomplete-js");
var autocomplete_plugin_query_suggestions_1 = require("@algolia/autocomplete-plugin-query-suggestions");
var autocomplete_plugin_recent_searches_1 = require("@algolia/autocomplete-plugin-recent-searches");
var lite_1 = require("algoliasearch/lite");
var preact_1 = require("preact");
require("@algolia/autocomplete-theme-classic");
var appId = 'latency';
var apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
var searchClient = (0, lite_1["default"])(appId, apiKey);
var recentSearchesPlugin = (0, autocomplete_plugin_recent_searches_1.createLocalStorageRecentSearchesPlugin)({
    key: 'qs-with-rs-example',
    limit: 3,
    transformSource: function (_a) {
        var source = _a.source;
        return __assign(__assign({}, source), { templates: __assign(__assign({}, source.templates), { header: function (_a) {
                    var state = _a.state;
                    if (state.query) {
                        return null;
                    }
                    return (<preact_1.Fragment>
                            <span className="aa-SourceHeaderTitle">Your searches</span>
                            <div className="aa-SourceHeaderLine"/>
                        </preact_1.Fragment>);
                } }) });
    }
});
var querySuggestionsPlugin = (0, autocomplete_plugin_query_suggestions_1.createQuerySuggestionsPlugin)({
    searchClient: searchClient,
    indexName: 'instant_search_demo_query_suggestions',
    getSearchParams: function () {
        return recentSearchesPlugin.data.getAlgoliaSearchParams({
            hitsPerPage: 5
        });
    },
    transformSource: function (_a) {
        var source = _a.source;
        return __assign(__assign({}, source), { templates: __assign(__assign({}, source.templates), { header: function (_a) {
                    var state = _a.state;
                    if (state.query) {
                        return null;
                    }
                    return (<preact_1.Fragment>
                            <span className="aa-SourceHeaderTitle">Popular searches</span>
                            <div className="aa-SourceHeaderLine"/>
                        </preact_1.Fragment>);
                } }) });
    }
});
(0, autocomplete_js_1.autocomplete)({
    container: '#autocomplete',
    placeholder: 'Search',
    openOnFocus: true,
    plugins: [recentSearchesPlugin, querySuggestionsPlugin]
});
