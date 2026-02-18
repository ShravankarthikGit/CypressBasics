/// <reference types="cypress" />

beforeEach('open test application', () => {
    cy.visit('/')
})

it('Input Fields', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    // Fill in details in Basic form
    cy.contains('nb-card', 'Basic form')
        .find('nb-card-header').invoke('text').then($headerText => {
            console.log($headerText);
        })
    cy.contains('nb-card', 'Basic form')
        .find('nb-card-header').invoke('text').should('equal', 'Basic form');
    // Using delay in type will delay the typing of each character by the specified time in milliseconds. 
    // This can be useful to simulate real user typing and to avoid issues with elements that may not be ready for input immediately.
    cy.contains('nb-card', 'Basic form').find('#exampleInputEmail1').clear();
    cy.contains('nb-card', 'Basic form').find('#exampleInputEmail1').type('hello@gmail.com', { delay: 200 });
    cy.get('#exampleInputPassword1').type('hello');
    cy.contains('Check me out').click();
    cy.contains('nb-card', 'Basic form').find('button').should('contain', 'Submit').click();

    // Fill in details in Using the Grid form
    const email = 'hello@gmail.com';
    const name = 'aopo'
    // Find element using label with text 'Email'
    cy.contains('nb-card', 'Using the Grid').find('nb-card-body').contains('label', 'Email').type(email);
    cy.contains('nb-card', 'Using the Grid').find('nb-card-body').find('#inputEmail1').clear().type(email, { delay: 200 });
    cy.get('#inputEmail1').should('have.value', email).clear();
    cy.contains('nb-card', 'Using the Grid').contains('Email').type(`${name}@gmail.com`);
})

it('PressKeys', () => {
    const email = 'hello@gmail.com';
    // Press Enter key after typing in the input field
    cy.contains('Auth').click();
    cy.contains('Login').click();
    // Once email is types we do tab to move to the password field and then press enter key to submit the form.
    // Note that pressing tab key is not mandatory to move to the password field. We can directly type in the password field 
    // after typing in the email field and then press enter key to submit the form.
    cy.get('#input-email').type(email).press(Cypress.Keyboard.Keys.TAB);
    // to press enter key we can use {enter} or {return} in the type() method. Both will work the same way.
    cy.get('#input-password').type('yellow{enter}');
})

it('RadioButtons', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    // Select radio button using click() and select option 1
    cy.contains('nb-card', 'Using the Grid').contains('Option 1').click()
    // for check we need to find the radio button exactly and then click on it
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 2').find('input').check({ force: true }).should('be.checked');
    // select radio button using check method. Here we are capturing 
    // all radio buttons to list and selecting first one 

    // We are pasing force as true to find the element even if it is not visible. 
    // This is useful when the radio button is hidden and we want to select it.
    // select option 2 radio button
    cy.contains('nb-card', 'Using the Grid').find('[type = "radio"]').then($radiobuttons => {
        cy.wrap($radiobuttons).eq(0).check({ force: true }).should('be.checked');
        cy.wrap($radiobuttons).eq(1).should('not.be.checked');
        // Check if the third radio button is disabled
        cy.wrap($radiobuttons).eq(2).should('be.disabled');
    })
})

it('checkboxes', () => {
    // Modal and Overlays -> Toastr
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();
    // when we perform unckeck it will check all three checkboxes
    cy.get('nb-card-body nb-checkbox').find('[type = "checkbox"]').uncheck({ force: true }).should('not.be.checked');

    // Note: Click will not perform on multiple checkboxes. It will only click on the first checkbox. 
    // so we need to use check() method to check multiple checkboxes.

    // -- To use click we need to use multiple click to click on each checkbox. 
    // -- This is not a good approach as it will make the test case longer and less maintainable.
    cy.get('nb-card-body nb-checkbox').find('[type = "checkbox"]').click({ force: true, multiple: true }).should('be.checked');

    // Using click is not advised
    cy.get('nb-card-body nb-checkbox').find('[type = "checkbox"]').then($checkBoxes => {
        // check first checkbox
        cy.wrap($checkBoxes).eq(0).uncheck({ force: true }).should('not.be.checked');
        cy.wrap($checkBoxes).eq(1).uncheck({ force: true }).should('not.be.checked');
        cy.wrap($checkBoxes).eq(2).should('be.checked');
    })
})

it.only('ListsAndDropdowns', () => {
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();
    // Dropdown with Select
    cy.contains('div', 'Toast type:').find('select').select('info').should('have.value', 'info');

    // Dropdown without Select
    cy.contains('div', 'Position:').find('.select-button').click();
    // click on the option with text 'top-left' in the dropdown list
    cy.get('.option-list').contains('top-left').click();
    // verify that the selected option is 'top-left'
    cy.contains('div', 'Position:').find('.select-button').should('have.text', 'top-left');

    cy.contains('div', 'Position:').find('nb-select').then($dropdownlist => {
        cy.wrap($dropdownlist).click();
        cy.get('.option-list').each(($option, index,) => {
            cy.wrap($option).click();
            ////cy.wrap($dropdownlist).should('have.text', $option.text());
            cy.wrap($dropdownlist).click();
        })
    })
})