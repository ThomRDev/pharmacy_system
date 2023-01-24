describe('Pruebas del Sprint 1', () => {
  let number = Math.random()
  function login(){
    cy.get('#username').type("thomtwd")
    cy.get('#password').type("123456")
    cy.get('#btn-login').click()
    cy.contains("Productos Registrados")
  }
  beforeEach(() => {
    localStorage.clear()
    cy.visit("/")
  })
  
  it('CP01-HU01  Autenticar usuario en el sistema', () => {
    cy.contains("Login")
    login()
    cy.contains("Productos Registrados")
    cy.contains("Thom Maurick R.")
  })
  it('CP03-HU03  Registrar Producto', () => {
    login()
    cy.get('[href="/inventory"]').click()
    cy.contains("Inventario de Productos")
    cy.get('#btn-add-product').click()
    cy.contains("Agregar Nuevo Producto")
    cy.get('#txtNameProduct').type("Producto #"+number)
    cy.get('#txtStock').type("50")
    cy.get('#txtPrice').type("50")
    cy.get('#txtDescription').type("Description #"+number)
    cy.get('#btn-save').click()
    cy.contains("Producto Producto #"+number+" creado correctamente").should("exist")
    // cy.wait(5000)
    cy.get('[href="/inventory"]').click()
    cy.get('[aria-label="Show filters"]').click()
    cy.get('.MuiDataGrid-filterForm input').type("Producto #"+number).type('{enter}')
    cy.wait(5000)
    cy.get('.MuiDataGrid-virtualScroller .MuiDataGrid-row.MuiDataGrid-row--lastVisible').should(($row:any)=>{
      console.log($row);
      if($row[0]){
        let id = $row[0].dataset.id
        cy.request({
          method : 'DELETE',
          url : 'http://localhost:8000/api/products/delete/'+id,
          // url : 'https://farmaciabackend-production.up.railway.app/api/products/delete/'+id,
          headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("token"),
          }
        })
      }
      // console.log(id);
    })
  })
})