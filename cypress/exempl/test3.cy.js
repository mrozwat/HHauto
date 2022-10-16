

const email = 'pocemail@mail.ru';
const psw = 'SS21%aaW';

describe('Assert',()=>{

    const login = new Login();

    it('Assert web tesr',()=>{
        
        cy.viewport(1920,1080);

        cy.visit('https://unsplash.com/');
        
        cy.location('protocol').should('eq','https:');

        cy.title().should('eq','Beautiful Free Images & Pictures | Unsplash');

        login.btnLogin().should('be.visible').click();

        login.email().type(email).should('have.value',email);

        login.password().type(psw).should('have.value',psw);

        login.clickLoginBtn().should('be.visible').click();

        cy.get('.flash__container').should('be.visible');

    })
})


// cy.get('a[class="flash flash--alert animated js-flash js-flash-alert"]') поиск по группе класов, но тут 2 таких 