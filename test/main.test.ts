///<reference path="_references.ts"/>

describe('puts.native.Error', () => {

    it('should be compatible with Error', () => {

        var e:Error = new puts.native.Error();
        expect(e instanceof Error).toBe(true);

    });

});
