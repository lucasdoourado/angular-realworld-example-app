describe('signup and login', () => {
  let randomString = Math.random().toString(36).substring(2);
  let username = 'user' + randomString;
  let email = 'user_test_' + randomString + '@email.com';
  const password = 'Test_user1';
  it('signup', () => {
    cy.intercept('POST', '**/*.realworld.io/api/users').as('newUser');
    cy.visit('http://localhost:4200/');
    cy.get('.nav').contains('Sign up').click();
    cy.url().should('include', '/register');
    cy.get('input[formcontrolname="username"]').type(username);
    cy.get('input[formcontrolname="email"]').type(email);
    cy.get('input[formcontrolname="password"]').type(password);
    cy.get('button').click();
    cy.wait('@newUser').then(({request, response}) => {
      cy.log('Request: ' + JSON.stringify(request));
      cy.log('Response: ' + JSON.stringify(response));
      expect(response.statusCode).to.eq(200);
      expect(request.body.user.username).to.eq(username);
      expect(request.body.user.email).to.eq(email);
    });
  });
  it('login', () => {
    cy.visit('http://localhost:4200/');
    cy.get('.nav').contains('Sign in').click();
    cy.get('input[formcontrolname="email"]').type(email);
    cy.get('input[formcontrolname="password"]').type(password);
    cy.get('button').contains("Sign in").click();
    cy.get(':nth-child(4) > .nav-link').should('contain', username);
  });
});
