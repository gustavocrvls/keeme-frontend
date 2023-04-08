"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./hooks/useSession.tsx":
/*!******************************!*\
  !*** ./hooks/useSession.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SessionContext\": () => (/* binding */ SessionContext),\n/* harmony export */   \"SessionProvider\": () => (/* binding */ SessionProvider),\n/* harmony export */   \"useSession\": () => (/* binding */ useSession)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst SessionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nfunction SessionProvider({ children  }) {\n    const [userName, setUserName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [userUsername, setUserUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SessionContext.Provider, {\n        value: {\n            userUsername,\n            setUserUsername\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/gustavocrvls/Workspace/keeme-frontend/hooks/useSession.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, this);\n}\nfunction useSession() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SessionContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ob29rcy91c2VTZXNzaW9uLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUF1RTtBQVdoRSxNQUFNRywrQkFBaUJELG9EQUFhQSxDQUFDLENBQUMsR0FBeUI7QUFFL0QsU0FBU0UsZ0JBQWdCLEVBQzlCQyxTQUFRLEVBQ2EsRUFBZTtJQUNwQyxNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR1AsK0NBQVFBLENBQUM7SUFDekMsTUFBTSxDQUFDUSxjQUFjQyxnQkFBZ0IsR0FBR1QsK0NBQVFBLENBQUM7SUFFakQscUJBQ0UsOERBQUNHLGVBQWVPLFFBQVE7UUFBQ0MsT0FBTztZQUFFSDtZQUFjQztRQUFnQjtrQkFDN0RKOzs7Ozs7QUFHUCxDQUFDO0FBRU0sU0FBU08sYUFBaUM7SUFDL0MsT0FBT1gsaURBQVVBLENBQUNFO0FBQ3BCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZWVtZS1mcm9udGVuZC8uL2hvb2tzL3VzZVNlc3Npb24udHN4PzUyYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNvbnRleHQsIFJlYWN0Tm9kZSwgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIFNlc3Npb25Db250ZXh0RGF0YSB7XG4gIHVzZXJVc2VybmFtZTogc3RyaW5nO1xuICBzZXRVc2VyVXNlcm5hbWU6ICh1c2VyVXNlcm5hbWU6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIFNlc3Npb25Qcm92aWRlclByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbn1cblxuZXhwb3J0IGNvbnN0IFNlc3Npb25Db250ZXh0ID0gY3JlYXRlQ29udGV4dCh7fSBhcyBTZXNzaW9uQ29udGV4dERhdGEpO1xuXG5leHBvcnQgZnVuY3Rpb24gU2Vzc2lvblByb3ZpZGVyKHtcbiAgY2hpbGRyZW4sXG59OiBTZXNzaW9uUHJvdmlkZXJQcm9wcyk6IEpTWC5FbGVtZW50IHtcbiAgY29uc3QgW3VzZXJOYW1lLCBzZXRVc2VyTmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFt1c2VyVXNlcm5hbWUsIHNldFVzZXJVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2Vzc2lvbkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlclVzZXJuYW1lLCBzZXRVc2VyVXNlcm5hbWUgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TZXNzaW9uQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVNlc3Npb24oKTogU2Vzc2lvbkNvbnRleHREYXRhIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoU2Vzc2lvbkNvbnRleHQpO1xufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJTZXNzaW9uQ29udGV4dCIsIlNlc3Npb25Qcm92aWRlciIsImNoaWxkcmVuIiwidXNlck5hbWUiLCJzZXRVc2VyTmFtZSIsInVzZXJVc2VybmFtZSIsInNldFVzZXJVc2VybmFtZSIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VTZXNzaW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./hooks/useSession.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var hooks_useSession__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hooks/useSession */ \"./hooks/useSession.tsx\");\n/* harmony import */ var styles_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styles/theme */ \"./styles/theme.ts\");\n\n\n// import { SidebarProvider } from 'hooks/useSidebar';\n\n\nfunction App({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n            theme: styles_theme__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(hooks_useSession__WEBPACK_IMPORTED_MODULE_2__.SessionProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/gustavocrvls/Workspace/keeme-frontend/pages/_app.tsx\",\n                    lineNumber: 13,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/gustavocrvls/Workspace/keeme-frontend/pages/_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/gustavocrvls/Workspace/keeme-frontend/pages/_app.tsx\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNrRDtBQUNsRCxzREFBc0Q7QUFDSDtBQUNsQjtBQUVsQixTQUFTRyxJQUFJLEVBQUVDLFVBQVMsRUFBRUMsVUFBUyxFQUFZLEVBQWU7SUFDM0UscUJBQ0U7a0JBQ0UsNEVBQUNMLDREQUFjQTtZQUFDRSxPQUFPQSxvREFBS0E7c0JBQzFCLDRFQUFDRCw2REFBZUE7MEJBRWQsNEVBQUNHO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTWxDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZWVtZS1mcm9udGVuZC8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgeyBDaGFrcmFQcm92aWRlciB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnO1xuLy8gaW1wb3J0IHsgU2lkZWJhclByb3ZpZGVyIH0gZnJvbSAnaG9va3MvdXNlU2lkZWJhcic7XG5pbXBvcnQgeyBTZXNzaW9uUHJvdmlkZXIgfSBmcm9tICdob29rcy91c2VTZXNzaW9uJztcbmltcG9ydCB0aGVtZSBmcm9tICdzdHlsZXMvdGhlbWUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcyk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPENoYWtyYVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICAgIDxTZXNzaW9uUHJvdmlkZXI+XG4gICAgICAgICAgey8qIDxTaWRlYmFyUHJvdmlkZXI+ICovfVxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgICB7LyogPC9TaWRlYmFyUHJvdmlkZXI+ICovfVxuICAgICAgICA8L1Nlc3Npb25Qcm92aWRlcj5cbiAgICAgIDwvQ2hha3JhUHJvdmlkZXI+XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiQ2hha3JhUHJvdmlkZXIiLCJTZXNzaW9uUHJvdmlkZXIiLCJ0aGVtZSIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/theme.ts":
/*!*************************!*\
  !*** ./styles/theme.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.extendTheme)({\n    fonts: {\n        body: \"Noto Sans, system-ui, sans-serif\",\n        heading: \"Noto Sans, system-ui, sans-serif\",\n        mono: \"Noto Sans, system-ui, sans-serif\"\n    },\n    components: {\n        Input: {\n            defaultProps: {\n                focusBorderColor: \"teal.500\"\n            }\n        },\n        Textarea: {\n            defaultProps: {\n                focusBorderColor: \"teal.500\"\n            }\n        },\n        NumberInput: {\n            defaultProps: {\n                focusBorderColor: \"teal.500\"\n            }\n        },\n        Select: {\n            defaultProps: {\n                focusBorderColor: \"teal.500\"\n            }\n        }\n    },\n    styles: {\n        global: {\n            \"*::-webkit-scrollbar-track\": {\n                borderRadius: \"10px\",\n                backgroundColor: \"#F5F5F5\"\n            },\n            \"*::-webkit-scrollbar\": {\n                width: \"8px\",\n                backgroundColor: \"#F5F5F5\"\n            },\n            \"*::-webkit-scrollbar-thumb\": {\n                borderRadius: \"10px\",\n                backgroundColor: \"#c9c9c9\"\n            }\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvdGhlbWUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStDO0FBRS9DLE1BQU1DLFFBQVFELDZEQUFXQSxDQUFDO0lBQ3hCRSxPQUFPO1FBQ0xDLE1BQU07UUFDTkMsU0FBUztRQUNUQyxNQUFNO0lBQ1I7SUFDQUMsWUFBWTtRQUNWQyxPQUFPO1lBQ0xDLGNBQWM7Z0JBQ1pDLGtCQUFrQjtZQUNwQjtRQUNGO1FBQ0FDLFVBQVU7WUFDUkYsY0FBYztnQkFDWkMsa0JBQWtCO1lBQ3BCO1FBQ0Y7UUFDQUUsYUFBYTtZQUNYSCxjQUFjO2dCQUNaQyxrQkFBa0I7WUFDcEI7UUFDRjtRQUNBRyxRQUFRO1lBQ05KLGNBQWM7Z0JBQ1pDLGtCQUFrQjtZQUNwQjtRQUNGO0lBQ0Y7SUFDQUksUUFBUTtRQUNOQyxRQUFRO1lBQ04sOEJBQThCO2dCQUM1QkMsY0FBYztnQkFDZEMsaUJBQWlCO1lBQ25CO1lBRUEsd0JBQXdCO2dCQUN0QkMsT0FBTztnQkFDUEQsaUJBQWlCO1lBQ25CO1lBRUEsOEJBQThCO2dCQUM1QkQsY0FBYztnQkFDZEMsaUJBQWlCO1lBQ25CO1FBQ0Y7SUFDRjtBQUNGO0FBRUEsaUVBQWVmLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZWVtZS1mcm9udGVuZC8uL3N0eWxlcy90aGVtZS50cz82OTZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4dGVuZFRoZW1lIH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCc7XG5cbmNvbnN0IHRoZW1lID0gZXh0ZW5kVGhlbWUoe1xuICBmb250czoge1xuICAgIGJvZHk6ICdOb3RvIFNhbnMsIHN5c3RlbS11aSwgc2Fucy1zZXJpZicsXG4gICAgaGVhZGluZzogJ05vdG8gU2Fucywgc3lzdGVtLXVpLCBzYW5zLXNlcmlmJyxcbiAgICBtb25vOiAnTm90byBTYW5zLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWYnLFxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgSW5wdXQ6IHtcbiAgICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBmb2N1c0JvcmRlckNvbG9yOiAndGVhbC41MDAnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIFRleHRhcmVhOiB7XG4gICAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgZm9jdXNCb3JkZXJDb2xvcjogJ3RlYWwuNTAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBOdW1iZXJJbnB1dDoge1xuICAgICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIGZvY3VzQm9yZGVyQ29sb3I6ICd0ZWFsLjUwMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgU2VsZWN0OiB7XG4gICAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgZm9jdXNCb3JkZXJDb2xvcjogJ3RlYWwuNTAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc3R5bGVzOiB7XG4gICAgZ2xvYmFsOiB7XG4gICAgICAnKjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2snOiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGNUY1JyxcbiAgICAgIH0sXG5cbiAgICAgICcqOjotd2Via2l0LXNjcm9sbGJhcic6IHtcbiAgICAgICAgd2lkdGg6ICc4cHgnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGNUY1JyxcbiAgICAgIH0sXG5cbiAgICAgICcqOjotd2Via2l0LXNjcm9sbGJhci10aHVtYic6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNjOWM5YzknLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHRoZW1lO1xuIl0sIm5hbWVzIjpbImV4dGVuZFRoZW1lIiwidGhlbWUiLCJmb250cyIsImJvZHkiLCJoZWFkaW5nIiwibW9ubyIsImNvbXBvbmVudHMiLCJJbnB1dCIsImRlZmF1bHRQcm9wcyIsImZvY3VzQm9yZGVyQ29sb3IiLCJUZXh0YXJlYSIsIk51bWJlcklucHV0IiwiU2VsZWN0Iiwic3R5bGVzIiwiZ2xvYmFsIiwiYm9yZGVyUmFkaXVzIiwiYmFja2dyb3VuZENvbG9yIiwid2lkdGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./styles/theme.ts\n");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();