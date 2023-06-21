describe('signup and login', () => {
  let randomString = Math.random().toString(36).substring(2);
  it('signup', () => {
    cy.visit('http://localhost:4200/');
    cy.get('.nav').contains('Sign up').click();
    cy.url().should('include', '/register');
    cy.get('input[formcontrolname="username"]').type('user' + randomString);
    cy.get('input[formcontrolname="email"]').type('user_test_' + randomString + '@email.com');
    cy.get('input[formcontrolname="password"]').type('Test_user1');
    cy.get('button').click();
  });
});
