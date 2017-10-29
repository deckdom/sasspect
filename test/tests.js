var path = require('path');
var sass = require('node-sass');
var chai = require('chai');
var expect = chai.expect;

describe('sasspect', function() {

    var types = {
        bool: [
            'true',
            'false',
        ],
        string: [
            "'something'",
            '"something"',
        ],
        color: [
            '#123',
            '#ffffff',
            'rgb(105,49,195)',
            'rgba(32,214,50,181)',
            'hsl(5,16,45)',
            'hsla(66,35,90,56)',
        ],
        number: [
            '123',
            '123.456',
        ],
        list: [
            '(123, "string")',
            '(123, "hello", #123, true)',
        ],
        map: [
            '(some: "map")',
        ]
    }

    it('should compile', function() {
        var result = sass.renderSync({
            file: path.resolve(__dirname, '../sasspect.scss'),
        });
        expect(result).to.be.an('object');
        // Checks for error-object
        expect(result).not.to.have.property('message');
        expect(result).not.to.have.property('line');
        expect(result).not.to.have.property('column');
        expect(result).not.to.have.property('status');
        expect(result).not.to.have.property('file');

        expect(result).to.have.property('css');
        expect(result).to.have.property('stats');
    });

    describe('functions', function() {
        describe('is-type', function() {
            it('should be equal', function() {
                Object.keys(types).forEach(function(type) {
                    var elements = types[type];
                    elements.forEach(function(value) {
                        var t = sass.renderSync({
                            data: `@import "sasspect";test{result:is-type(${value}, "${type}")}in{value:${type}}`,
                            outputStyle: 'compressed'
                        });
                        expect(t.css.toString().trim()).to.be.equal(`test{result:true}in{value:${type}}`);
                    });
                });
            });

            it('shouldn\'t be equal', function() {
                Object.keys(types).forEach(function(type) {
                    Object.keys(types).forEach(function(other) {
                        if (type === other) {
                            return;
                        }
                        var elements = types[other];
                        elements.forEach(function(value) {
                            var t = sass.renderSync({
                                data: `@import "sasspect";test{result:is-type(${value}, "${type}")}in{value:${type}}`,
                                outputStyle: 'compressed',
                            });
                            expect(t.css.toString().trim()).to.be.equal(`test{result:false}in{value:${type}}`);
                        });
                    });
                });
            });
        });
    })
})