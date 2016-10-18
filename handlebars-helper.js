'use strict';

var HandlebarsLayouts = require('handlebars-layouts');
var Helpers = require('handlebars-helpers');
var moment = require('moment');

module.exports = function (Handlebars) {
    Handlebars.registerHelper(HandlebarsLayouts(Handlebars));
  //  Helpers({handlebars: Handlebars});
    ['array', 'code', 'collection', 'comparison', 'date', 'fs', 'html', 'i18n', 'inflection', 'logging', 'markdown', 'match', 'math', 'misc', 'number', 'path', 'string', 'url'].forEach(function(name) {
        Helpers[name]({
        handlebars: Handlebars
        });
    });

    // dang ky rivetData helper block cho handlebars ở đây

    // rivetData helper, bat buoc key trong meta data cua content phai la 'rivetData'
    Handlebars.registerHelper('rivetData', obj => {
        if (obj.data.root.rivetData)
            return JSON.stringify(obj.data.root.rivetData);
        else
            return '{}';
    });
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      });

    Handlebars.registerHelper('json', function (obj) {
        return JSON.stringify(obj);
    });
    
     Handlebars.registerHelper('toString', function (obj) {
        return obj.toString();
    });
    Handlebars.registerHelper('removeIndex', function (url) {
        return url.replace('index.html', '');
    });
    
    var lookupEx = function (obj, propertyPath) {
		if(!propertyPath.split) propertyPath = String(propertyPath);
        var props = propertyPath.split('.');
        var current = obj;
        while(props.length) {
            if(typeof current !== 'object') return undefined;
            current = current[props.shift()];
        }
        return current;
    };
    
    Handlebars.registerHelper('lookupCategory', function (obj, childPath, propertyPath) {
		if(!childPath.split) childPath = String(childPath);
        var chunks = childPath.split('.');
        var count = 0;
        var node = obj;
        chunks.some(function (name) {
            count++;
            var fullCategoryName = chunks.slice(0, count).join('.');
            var found = node.children.some(function (childNode) {
                if (childNode.category == fullCategoryName) {
                    node = childNode;
                    return true;
                }
                return false;
            });

            if (!found) {
                node = undefined;
                return true;
            }
            return false;
        });
		
		if (typeof(propertyPath) === 'string' && node != undefined) {
			return lookupEx(node, propertyPath);
		}
        return node;
    });

    /**
     * Lookup nested object
     */
    Handlebars.registerHelper('lookupEx', lookupEx);

    /**
     * return array of category from root to leaf of @param {string} childPath
     */
    Handlebars.registerHelper('genBreadcrumb', function (obj, childPath) {
		if(!childPath.split) childPath = String(childPath);
        var chunks = childPath.split('.');
        var count = 0;
        var node = obj;
        var ret = [];
        chunks.some(function (name) {
            count++;
            var fullCategoryName = chunks.slice(0, count).join('.');
            var found = node.children.some(function (childNode) {
                if (childNode.category == fullCategoryName) {
                    node = childNode;
                    ret.push(childNode);
                    return true;
                }
                return false;
            });

            if (!found) {
                ret = undefined;
                return true;
            }
            return false;
        });

        return ret;
    });
};