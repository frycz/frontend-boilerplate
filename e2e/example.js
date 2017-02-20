describe('Login', () => {

  beforeEach(() => {
    browser.get('/')
  })

  it('should have correct title', () => {
    expect(browser.getTitle()).toEqual("Google")
  })

})