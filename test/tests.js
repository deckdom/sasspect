var path = require('path');
var sass = require('node-sass');
var chai = require('chai');
var expect = chai.expect;

describe('sasspect', function() {

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
                sameType(true, 'bool');
                sameType(false, 'bool');
                sameType('string', 'string');
                sameType('#123', 'color');
                sameType('#ffffff', 'color');
                sameType('rgb(105,49,195)', 'color');
                sameType('rgba(32,214,50,181)', 'color');
                sameType('hsl(5,16,45)', 'color');
                sameType('hsla(66,35,90,56)', 'color');
                sameType('123', 'number');
                sameType('123.456', 'number');
                sameType('(123,456)', 'list');
                sameType('(some: "map")', 'map');
            });

            it('shouldn\'t be equal', function() {
                otherType('"string"', 'bool');
                otherType('123', 'bool');
                otherType('123.456', 'bool');
                otherType('#123', 'bool');
            });
        })
    })
})

function sameType(value, type) {
    var t = sass.renderSync({
        data: `@import "sasspect";test{result:is-type(${value}, "${type}")}in{value:${type}}`,
        outputStyle: 'compressed'
    });
    expect(t.css.toString().trim()).to.be.equal(`test{result:${true}}in{value:${type}}`);
    
}

function otherType(value, type) {
    var t = sass.renderSync({
        data: `@import "sasspect";test{result:is-type(${value}, "${type}")}in{value:${type}}`,
        outputStyle: 'compressed',
    });
    expect(t.css.toString().trim()).to.be.equal(`test{result:${false}}in{value:${type}}`);
}