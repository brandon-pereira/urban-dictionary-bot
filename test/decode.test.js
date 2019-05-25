/* eslint-disable */
const parse = require('../src/lib/urban-dictionary');

const basicExample = {
    entries: [
        {
            definition:
                'The best [feeling] in the world. When a man or woman climaxes. [The peak] [point] of sex.',
            permalink: 'http://orgasm.urbanup.com/1373982',
            thumbs_up: 319,
            sound_urls: [Array],
            author: 'tahareh',
            word: 'orgasm',
            defid: 1373982,
            current_vote: '',
            written_on: '2005-07-18T00:00:00.000Z',
            example: '"[Wow]! That was [amazing]. That was [the best] orgasm I ever had."',
            thumbs_down: 141
        }
    ]
};

describe('Parse Library', () => {
    const basic = parse.decode(basicExample);
    test('it should return basic information', () => {
        expect(basic.valid).toBe(true);
        expect(basic.definition).toBe(
            'The best feeling in the world. When a man or woman climaxes. The peak point of sex.'
        );
        expect(basic.related).toEqual(['feeling', 'The peak', 'point']);
    });
});
