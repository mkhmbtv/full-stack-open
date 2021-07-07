describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#login-button').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.error')
        .contains('invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })

    describe('When logged in', function () {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'testing' })
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Go To Statement Considered Harmful')
        cy.get('#author').type('Edsger W. Dijkstra')
        cy.get('#url').type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
        cy.get('#create-button').click()

        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
      })

      describe('And several blogs exist', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
          })
          cy.createBlog({
            title: 'On let vs const',
            author: 'Dan Abramov',
            url: 'http://overreacted.io/on-let-vs-const/'
          })
          cy.createBlog({
            title: 'The Joel Test: 12 Steps to Better Code',
            author: 'Joel Spolsky',
            url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
          })
        })

        it.only('User can like one of them', function() {
          cy.contains('On let vs const')
            .contains('view')
            .click()

          cy.contains('On let vs const').parent().contains('likes').as('likes')
          cy.get('@likes').contains('0')
          cy.get('@likes').find('button').click()
          cy.get('@likes').contains('1')
        })
      })
    })
  })
})