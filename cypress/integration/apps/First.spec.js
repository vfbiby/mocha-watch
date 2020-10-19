describe("Todo List", function(){
  it("can list all todos", function(){
    cy.visit('http://localhost:3000')
    cy.contains('Todo')
    cy.contains('Use Redux')
  })

  it("can add a todo", function(){
    cy.visit('http://localhost:3000')
    cy.get('input[type=text]').type('Washing my clothes')
    cy.contains('Add Todo').click()
    cy.contains('Washing my clothes')
  })
})
