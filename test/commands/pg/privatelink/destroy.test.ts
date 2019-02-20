import {expect, test} from '../../../test'

describe('pg:privatelink:destroy', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .delete('/private-link/v0/databases/postgres-123')
      .reply(200, {})
    )
    .stderr()
    .stdout()
    .command(['pg:privatelink:destroy', 'postgres-123', '--app', 'myapp'])
    .it('destroys a privatelink endpoint', ctx => {
      expect(ctx.stderr).to.contain('Destroying privatelink endpoint... done')
    })
})