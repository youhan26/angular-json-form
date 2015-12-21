/**
 * Created by YouHan on 2015/12/21.
 */

(function () {
    angular.module('angular-json-form', [])
        .constant('jsonConfig', {
            name: 'JSON示例'
        })
        .directive('jsonForm', ['jsonConfig', function (jsonConfig) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'template/jsonForm.html',
                scope: {},
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    if (!ngModel) {
                        return;
                    }
                    scope.name = attrs.name ? attrs.name : jsonConfig.name;
                    ngModel.$render = function () {
                        if (ngModel.$viewValue) {
                            var el = converter(ngModel.$viewValue);
                            element.find('.panel-body').append(el);
                        }
                    };
                    function converter(json) {
                        if (!json) {
                            return null;
                        } else {
                            var example = JSON.parse(json);
                            return syntaxHighlight(example, 0);
                        }
                    }

                    function syntaxHighlight(example, level, name) {
                        if (!example) {
                            if (name) {
                                return '<div>' + getBlank(level) + name + ' : ' + '<span class="null">' + 'null' + '</span>' + '</div>';
                            }
                        }
                        name = name ? name : '   ';
                        if (typeof example == 'string') {
                            if (name) {
                                return '<div>' + getBlank(level) + name + ' : ' + '<span class="string">' + example + '</span>' + '</div>';
                            }
                        }
                        if (typeof example == 'number') {
                            if (name) {
                                return '<div>' + getBlank(level) + name + ' : ' + '<span>' + example + '</span>' + '</div>';
                            }
                        }
                        if (typeof example == 'boolean') {
                            if (name) {
                                return '<div>' + getBlank(level) + name + ' : ' + '<span class="boolean">' + example + '</span>' + '</div>';
                            }
                        }
                        if (Array.isArray(example)) {
                            var result = '';
                            if (example.length == 0) {
                                result += '<div>' + getBlank(level) + name + ' :[ ]' + '</div>';
                            } else {
                                result += '<div>' + getBlank(level) + name + ' :[' + '</div>';
                                var temp = level;
                                for (var i = 0, ii = example.length; i < ii; i++) {
                                    result += syntaxHighlight(example[i], ++temp, i);
                                }
                                result += '<div>' + getBlank(level) + ' ]' + '</div>';
                            }
                            return result;
                        }
                        if (typeof example == 'object') {
                            var result = '<div>' + getBlank(level) + '{' + '</div>';
                            for (var pro in example) {
                                var temp = level;
                                result += syntaxHighlight(example[pro], ++temp, pro);
                            }
                            result += '<div>' + getBlank(level) + '}</div>';
                            return result;
                        }
                    }

                    function getBlank(n) {
                        var result = '';
                        if (n > 0) {
                            for (var i = 0; i < n; i++) {
                                result += '&nbsp;&nbsp;&nbsp;';
                            }
                        }
                        return result;
                    }
                }
            }
        }])
        .run(function ($templateCache) {
            $templateCache.put('template/jsonForm.html',
            "<div class=\"row\" style=\"margin-top: 20px\">"+
            "    <h3>{{::name}}</h3>"+
            "    <hr>"+
            "    <p>"+
            "    <span style=\"text-transform:lowercase;font-weight:600;color: blue;\">"+
            "        <strong>{{::model}}</strong>"+
            "    </span>"+
            "    </p>"+
            "</div>"
            );
        });
})();
