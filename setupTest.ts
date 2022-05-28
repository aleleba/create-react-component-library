// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//import fetch Mock
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

//Fixing Pollyfill for react-slick
window.matchMedia =
window.matchMedia ||
function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};