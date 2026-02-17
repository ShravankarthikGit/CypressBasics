/// <reference types="cypress" />

beforeEach('open test application', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
})

it('CypressLocators', () => {
    // Attributes inlcude class, id, name, placeholder, fullwidth, type, value, etc
    // By Tag Name only single quotes
    cy.get('input')

    // By ID value nwe put # before the id value
    cy.get('#inputEmail')

    // By Class name we put . before the class name
    cy.get('.inner-circle')

    // By Attribute. We put square brackets and inside the square brackets we put the attribute name and value
    // By Attribute only in here fullwidth
    cy.get('[fullwidth]')

    // By Attribute and value
    cy.get('[placeholder="Email"]')

    // By entire class value with multiple class names. 
    // We put square brackets and inside the square brackets we put the attribute name and value. 
    // Here we have class attribute with multiple class names
    cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // Combine several attributes. Here we have attribute placeholder with value and fullwidth
    cy.get('[placeholder ="Email"][fullwidth]')

    // By Tag name and attribute
    cy.get('input[placeholder="Email"]')

    // Find by data-cy attribute. This is a custom attribute that we can add to our HTML elements for testing purposes. 
    // We put square brackets and inside the square brackets we put the attribute name and value
    cy.get('[data-cy="inputEmail1"]')
})

it('CypressLocatorMethods', () => {
    // get() - find element in the page
    // find() - only find element inside another element or child elements
    // contains() - to find webelements by text

    // contains() method is used to find the element by its text. 
    // cy.contains() command only accepts up to two main arguments (a selector and the text).
    // It will find the first element that contains the text 'Sign in'
    cy.contains('Sign in')
    // ignore case sensitivity
    cy.contains('Sign in', { matchCase: false }).click();
    // contains() method is used to find the element by its text.
    cy.contains('Sign')
    // Using attribute key value pair to find the element with text 'Sign in'
    cy.contains('[status="primary"]', 'Sign in')

    // contains can only accept 2 values. In here tagname and text. 
    // It will find the first element that contains the text 'Sign in' and is a button
    cy.contains('nb-card', 'Horizontal form')
        .contains('button', 'Sign in');

    // find() method is used to find the element inside another element or child elements.
    // It will find the element with text 'Sign in' inside the element with text 'Horizontal form'
    cy.contains('nb-card', 'Horizontal form').find('button')

    // get() method is used to find the element in the page. It will find the element with text 'Sign in' in the whole page
    // so multiple elements with text 'Sign in' will be found. 
    // To avoid this we can use contains() method to find the element with text 'Sign in' inside the element with text 'Horizontal form'
    cy.contains('nb-card', 'Horizontal form').get('button')
})

it('ChildElements', () => {
    // find can only take one argument which is the element we want to find inside another element.
    // find cant take plain text as argument
    cy.contains('nb-card', 'Using the Grid').find('.row').find('button');
    cy.contains('nb-card', 'Using the Grid').find('.row').contains('button', 'Sign in');

    // Find radio button with text 'Option 1' and click it col-sm-9
    cy.contains('nb-card', 'Using the Grid').find('nb-radio-group').contains('Option 1');

    // we can also find child element as below. Here we are finding 
    // parent and child element in one line. We are finding the element with text 'Option 1' inside the element with 
    // tag name 'nb-radio-group' which is inside the tag name nb-card
    cy.get('nb-card nb-radio-group').contains('Option 1');
    //when we have immediate child for parent element we can use > sign to find the child element. 
    cy.get('nb-card > nb-card-header').contains('Using the Grid');

    cy.get('nb-card > nb-card-body [placeholder = "Email"]');

    cy.get('[placeholder = "Jane Doe"]');
})


it('ParentElements', () => {
    // Here in the form we are trying to find the Sign In button
    // We are finding the element with id inputEmail1 and then we are finding the parent element which is form and 
    // then we are finding the button element inside the form element.
    cy.get('#inputEmail1').parents('form').find('button');
    // We can also find the parent element with text 'Using the Grid' and then find the button element inside it.
    // Here we are finding one parent up 
    cy.contains('Using the Grid').parent('nb-card').find('button');

    cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button');
})

it('CommandChains', () => {
    // MAke sure to chain command until action command like click, type, etc.
    cy.get('#inputEmail1')
        .parents('form')
        .find('button')
        .click()

    cy.get('#inputEmail1')
        .parents('form')
        .find('nb-radio')
        .first()
        .should('have.text', 'Option 1')
        .click()
})

it('ReusingLocators', () => {

    cy.get('#inputEmail1').parents('form').find('button').click()

    // 1. Cypress Alias. //
    // We can use alias to store the element and reuse it later in the test. 
    // We can use @ symbol to access the alias.
    // Here we are storing the element with id inputEmail1 in an alias called inputEmail and then 
    // we are using the alias to find the parent element which is form and then we are finding the button element inside the 
    // form element and clicking it.
    cy.get('#inputEmail1').parents('form').find('button')
    // Using alias to find the parent element which is form and then finding the button element inside the form element and 
    // clicking it.
    cy.get('@inputEmail').find('button').click()

    // 2. Custom then() method. 
    // We can use then() method to store the element in a variable and reuse it later in the test.
    // Use then method to Extracting data or performing logic.
    // Returns a jQuery Object (requires cy.wrap to use Cypress commands).
    // Only available inside that specific callback.

    // cy.wrap() method is used to wrap the jQuery object returned by the then() method and make it a Cypress 
    // object so that we can use Cypress commands on it.
    cy.get('#inputEmail1').then($inputemail => {
        cy.wrap($inputemail).parents('form').find('button')
        // As we cant use a return onthe input email directly we can Return the input email element to use it later in the test. 
        // We can use the alias to find the parent element which 
        // is form and then we can find the button element inside the form element and click it.
        cy.wrap($inputemail).as('inputEmailAlias')
    })
    // using alias created above
    cy.get('@inputEmailAlias').parents('form').find('button').click();
})

it('ExtractingValues', () => {
    // Using JQuery Methods to extract text and value from elements.
    cy.get('[for="exampleInputEmail1"]').then($label => {
        // To extract text from label element we can use text() method and to extract the value from input element we can use val() method.
        const labelText = $label.text();
        console.log(labelText);
    })

    // Using invoke command to extract text from label element. We can use invoke command to call the text() method on the 
    // label element and then we can use then() method to get the text value and log it to the console.
    cy.get('[for="exampleInputEmail1"]').invoke('text').then($labelText => {
        console.log(labelText);
    })

    // We can also use alias to store the text value and reuse it later in the test.
    // Below we have saved the value of the text in an alias called emailLabel and then we can use the alias to log the 
    // value to the console.
    cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabel');
    //Assert
    cy.get('[for="exampleInputEmail1"]').invoke('text').should('equal', 'Email address');

    //Invoke Attribute Value. IN here we are passing the attribute name which is class to the invoke command and 
    // then we are using then() method to get the class value and log it to the console.
    cy.get('#exampleInputEmail1').invoke('attr', 'class').then($placeholder => {
        console.log($placeholder);
    })
    cy.get('#exampleInputEmail1').invoke('attr', 'class').should('have.attr', 'class', 'input-full-width size-medium status-basic shape-rectangle nb-transition ng-untouched ng-pristine ng-valid')

    // Invoke input field value
    cy.get('#exampleInputEmail1').type('hello@test.com').invoke('prop', 'value').then($inputValue => {
        console.log($inputValue);
    })
})

it.only('Assertions', () => {
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');
    cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address');
    cy.get('[for="exampleInputEmail1"]').should('include.text', 'Email');
    cy.get('[for="exampleInputEmail1"]').should('not.contain', 'email address');
    cy.get('[for="exampleInputEmail1"]').should('not.have.text', 'email address');
    cy.get('[for="exampleInputEmail1"]').should('not.include.text', 'email');
    // Using text() method
    cy.get('[for="exampleInputEmail1"]').then($label => {
        expect($label.text()).to.equal('Email address');
    })
    // Using invoke command
    cy.get('[for = "exampleInputEmail1"]').invoke('text').should('equal', 'Email address');
})