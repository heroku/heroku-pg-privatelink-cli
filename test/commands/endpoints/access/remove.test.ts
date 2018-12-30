import {expect, test} from '../../../test'

describe('endpoints:access:remove', () => {
  test
    .nock('https://postgres-api.heroku.com', api => api
      .patch('/private-link/v0/databases/postgres-123/whitelisted_accounts')
      .reply(200, {})
    )
    .stdout()
    .stderr()
    .command(['endpoints:access:remove', 'postgres-123', 'arn:aws:iam::123456789:root', '--app', 'myapp'])
    .it('removes an account from the whitelist', ctx => {
      expect(ctx.stderr).to.contain('Removing account from the whitelist... done')
    })
})