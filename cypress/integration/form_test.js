describe('Quotes App', () => {
    beforeEach(() => {
        cy.visit(`http://localhost:3000`)
    })

    //create helpers to collect dom elements
    const firstNameInput = () => cy.get(`input[name=first_name]`)
    const lastNameInput = () => cy.get(`input[name=last_name]`)
    const foobarInput = () => cy.get (`input[name=foobar]`)
    const emailInput = () => cy.get(`input[name=email]`)
    const avatarInput = () => cy.get(`input[name=avatar]`)
    const termsOfServiceInput = () => cy.get(`input[name=termsOfService]`)
    const submitBtn = () => cy.get(`button[id="submitBtn"]`)

    it('sanity check to make sure that tests work', () => {
        //keyword 'it' is a test
        //"expect" is an assertion
        //there can be several assertions in one test, but they all need to relate
        //to "the one thing" we're testing
        expect(1 + 2).to.equal(3)
        expect(2 + 2).not.to.equal(5)// strict ===
        expect({}).not.to.equal({})// strict ===
        expect({}).to.eql({})  //not strict
    })

    it('the proper elements are showing', () => {
        firstNameInput().should('exist')
        lastNameInput().should('exist')
        foobarInput().should('not.exist')
        emailInput().should('exist')
        avatarInput().should('exist')
        termsOfServiceInput().should('exist')
      })


   describe(`Filling out the inputs and cancelling`, () => {
    it('can type in the inputs', () => {
        firstNameInput()
          .should('have.value', '')
          .type('Norm')
          .should('have.value', 'Norm')
  
        lastNameInput()
          .should('have.value', '')
          .type('Jeune')
          .should('have.value', 'Jeune')
      })

      it('can type in the inputs', () => {
        emailInput()
          .should('have.value', '')
          .type('norm@norm.com')
          .should('have.value', 'norm@norm.com')
      })
   })

   describe(`selecting the checkbox`, () => {
      it(`can select the checkbox`, () => {
          termsOfServiceInput()
            cy.get('[type="checkbox"]').check()
      })
   })

   describe(`user can submit form data`, () => {
    it('the submit button enables when all inputs are filled out', () => {
        firstNameInput().type('Norm')
        lastNameInput().type('Jeune')
        emailInput().type('norm@norm.com')
        avatarInput()
            cy.get('[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'testPicture.png',
                mimeType: 'image/png'
            })
        termsOfServiceInput()
            cy.get('[type="checkbox"]').check()
        submitBtn().should('not.be.disabled')
      })
   })
})