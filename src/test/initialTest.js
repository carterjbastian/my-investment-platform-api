var expect = require('chai').expect

suite('UNIT: Tests', () => {
  let sample

  setup(done => {
    sample = 500
    done()
  })

  test('set up correctly', async () => {
    expect(sample).to.equal(500)
  })
})
