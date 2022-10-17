


let urlArray=[];
let pageTotal;
let urlCurentOnpage;
let vacanSname;
let companyName;
let statusO;
  

const login = (name) => {
    cy.session( name,() => {
            cy.visit('https://cheboksar.hh.ru/account/login')
            cy.get('.account-login-actions > .bloko-link').click();
            cy.get(':nth-child(7) > .bloko-input-text-wrapper > .bloko-input-text').type('79373970241');
            cy.get(':nth-child(8) > .bloko-input-text-wrapper > .bloko-input-text').type('Aezakmi1')
            cy.get('.account-login-actions > .bloko-button > span').click();
            cy.url().should('contain', '/?hhtmFrom=account_login')
        
    },{
      
        cacheAcrossSpecs: true,
      })
    
  }
   

  beforeEach(() => {
    
        login('1234');
       
  })
  
  

  before(() => {
    cy.request('GET',`https://api.hh.ru/vacancies/?text=Qa&specialization=1.117&period-15&per_page=100&page=1&area=113`).then((response)=>{
        pageTotal= response.body.pages-2;
        
    })
    
  })

 

  
describe('hh take url',()=>{
    
    let pagecurent=1;

    it('get url',()=>{
        
        for(let i=0;i<pageTotal;i++){
            

            cy.request('GET',`https://api.hh.ru/vacancies/?text=Qa&specialization=1.117&period-15&per_page=100&page=${pagecurent}&area=113`).then((response)=>{
                   


                        for( let x=0;x<response.body.items.length;x++){
                
                            urlArray.push(response.body.items[x].alternate_url)
                        }
                           
                     })
                
                pagecurent++;
            }
            
            console.log(urlArray)  
           
    })

    
    
    

    it('otklik',()=>{
        
        for (let y=0;y<=urlArray.length;y++){
        
    
            cy.visit(urlArray[y+1]).then(()=>{

                 

                  cy.get('.vacancy-action_stretched > .bloko-button > span').then(($el)=>{
                    statusO=$el.text();  
                    if(statusO=='Откликнуться'){

                        cy.get('.bloko-header-section-1 > span').then(($el)=>{
                            vacanSname=$el.text()
                            cy.get(':nth-child(2) > .bloko-columns-row > .bloko-column > .block-employer--jHuyqacEkkrEkSl3Yg3M > .wrapper--FVo3cUofDgv3zkHBdMP1 > .vacancy-company-redesigned > .vacancy-company-details > .vacancy-company-name > .bloko-link > .bloko-header-section-2 > span').then(($el)=>{
                                companyName=$el.text()

                                console.log(companyName)
                                console.log(vacanSname)
                                cy.get('.vacancy-action_stretched > .bloko-button').click();
                                cy.get('[data-qa="vacancy-response-letter-informer"] > .bloko-button > span').click();
                                cy.get('.bloko-textarea').type(`
                                Добрый день, я хотел бы получить вакансию ${vacanSname} Junior, мой опыт  в тестировании  составляет 6 месяцев.
                                Мои основные навыки это javaScript/cypress/jest/charles/postaman/sql/git/html/css.
                                Хотелось бы получить работу в вашей компании'${companyName}' поскольку она являетесь крупной компанией с возможностью карьерного роста и развития.
                                
                                Мое резюме: https://ozwat.ru/rez.pdf
                                GitHub:https://github.com/mrozwat
                                
                                Со мной можно связаться несколькими способами:
                                Telegram @ozwat (самый быстрый)
                                Телефон +79373970241
                                Email ozwatandreev@gmail.com`)
                                cy.get('.bloko-form-row > .bloko-button > span').click()
                                
                            })



                         })
                    }
                 })

            });
            
            
            // if (document.querySelector('.vacancy-action_stretched > .bloko-button > span'))
            // cy.get('.vacancy-action_full-size > .bloko-button > span')
        }

    })

  


})