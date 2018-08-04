(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'styled-components', 'styled-icons/fa-solid'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('styled-components'), require('styled-icons/fa-solid'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.styledComponents, global.faSolid);
        global.styles = mod.exports;
    }
})(this, function (exports, _styledComponents, _faSolid) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ResultLink = exports.Result = exports.ResultList = exports.SearchIcon = exports.InputWrapper = exports.Input = exports.Wrapper = undefined;

    var _styledComponents2 = _interopRequireDefault(_styledComponents);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Wrapper = exports.Wrapper = _styledComponents2.default.div.withConfig({
        displayName: 'styles__Wrapper',
        componentId: 's1o8q90i-0'
    })(['font-family:\'Helvetica Neue\',Arial,Helvetica,sans-serif;font-size:14px;width:100%;display:flex;flex-direction:column;align-items:stretch;']);

    var Input = exports.Input = _styledComponents2.default.input.withConfig({
        displayName: 'styles__Input',
        componentId: 's1o8q90i-1'
    })(['margin:0;color:rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.5);padding:10px 10px 10px 40px;box-shadow:0 0 0 2px rgba(0,0,0,0.1);border-radius:5px;width:100%;font-family:\'Helvetica Neue\',Arial,Helvetica,sans-serif;font-size:14px;']);

    var InputWrapper = exports.InputWrapper = _styledComponents2.default.div.withConfig({
        displayName: 'styles__InputWrapper',
        componentId: 's1o8q90i-2'
    })(['position:relative;']);

    var SearchIcon = exports.SearchIcon = (0, _styledComponents2.default)(_faSolid.Search).withConfig({
        displayName: 'styles__SearchIcon',
        componentId: 's1o8q90i-3'
    })(['position:absolute;width:15px;height:15px;left:10px;top:12px;']);

    var ResultList = exports.ResultList = _styledComponents2.default.ul.withConfig({
        displayName: 'styles__ResultList',
        componentId: 's1o8q90i-4'
    })(['background-color:#fff;list-style:none;margin:0;padding:0;width:100%;z-index:1000;overflow:hidden;text-overflow:ellipsis;']);

    var Result = exports.Result = _styledComponents2.default.li.withConfig({
        displayName: 'styles__Result',
        componentId: 's1o8q90i-5'
    })(['border:1px solid rgba(0,0,0,0.1);&:last-child{border-bottom-left-radius:10px;border-bottom-right-radius:10px;}']);

    var ResultLink = exports.ResultLink = _styledComponents2.default.button.withConfig({
        displayName: 'styles__ResultLink',
        componentId: 's1o8q90i-6'
    })(['font-family:\'Helvetica Neue\',Arial,Helvetica,sans-serif;font-size:14px;background:none;border:none;outline:inherit;width:100%;padding:10px;overflow:hidden;text-overflow:ellipsis;color:#404040;&:active{color:#202020;background-color:#eee;text-decoration:none;cursor:pointer;}']);
});
//# sourceMappingURL=styles.js.map