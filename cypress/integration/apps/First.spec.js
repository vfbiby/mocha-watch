describe("Todo List", function(){
  it("can list all todos", function(){
    cy.visit('http://localhost:3000')
    cy.contains('Todo')
  })

  it("can add a todo", function(){
    cy.visit('http://localhost:3000')
    cy.get('input[type=text]').type('Washing my clothes')
    cy.contains('Add Todo').click()
    cy.contains('Washing my clothes')
  })

  it("can complete a todo", function(){
    cy.visit('http://localhost:3000')
    cy.get('input[type=text]').type('Washing my clothes')
    cy.contains('Add Todo').click()
    cy.contains('Washing my clothes').click()
    cy.get('li').should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)')
  })

  it("can filter todos", function(){
    cy.visit('http://localhost:3000')
    cy.get('input[type=text]').type('Washing my clothes')
    cy.contains('Add Todo').click()
    cy.get('input[type=text]').type('Go to school')
    cy.contains('Add Todo').click()
    cy.contains('Washing my clothes').click()
    cy.contains('completed').click()
    cy.get('li').should('have.length', 1)
  })
})
